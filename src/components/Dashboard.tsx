import { useState } from 'react'
import { Phone, TrendingUp, Clock, AlertCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { DashboardHeader } from './DashboardHeader'
import { MetricCard } from './MetricCard'
import { CallDurationChart } from './CallDurationChart'
import { CallVolumeChart } from './CallVolumeChart'
import { FailureAnalysis } from './FailureAnalysis'
import type { SadPathData } from './FailureAnalysis'
import { EmailModal } from './EmailModal'
import { Toast } from './Toast'
import { ConfirmModal } from './ConfirmModal'

// Mock data
const defaultCallDurationData = [
    { time: '00:00', duration: 45 },
    { time: '04:00', duration: 32 },
    { time: '08:00', duration: 78 },
    { time: '12:00', duration: 95 },
    { time: '16:00', duration: 67 },
    { time: '20:00', duration: 43 },
]

const defaultCallVolumeData = [
    { day: 'Mon', calls: 1200, successful: 1050 },
    { day: 'Tue', calls: 1350, successful: 1180 },
    { day: 'Wed', calls: 1100, successful: 960 },
    { day: 'Thu', calls: 1450, successful: 1265 },
    { day: 'Fri', calls: 1600, successful: 1400 },
    { day: 'Sat', calls: 900, successful: 785 },
    { day: 'Sun', calls: 750, successful: 655 },
]

const defaultSadPathData: SadPathData[] = [
    { name: 'User refused to confirm identity', value: 35, color: '#4fd1c7' },
    { name: 'Caller Identification', value: 25, color: '#8b5cf6' },
    { name: 'Incorrect caller identity', value: 20, color: '#06b6d4' },
    { name: 'Verbal Agreement', value: 15, color: '#10b981' },
    { name: 'Customer Hostility', value: 12, color: '#f59e0b' },
    { name: 'Assistant did not speak French', value: 10, color: '#ef4444' },
    { name: 'Unsupported Language', value: 8, color: '#84cc16' },
    { name: 'Assistant did not speak Spanish', value: 5, color: '#f97316' },
]

const Dashboard = () => {
    const [sadPathData, setSadPathData] = useState<SadPathData[]>(defaultSadPathData)
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
    const [isLoadModalOpen, setIsLoadModalOpen] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
    const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean
        title: string
        message: string
        onConfirm: () => void
        type?: 'warning' | 'danger'
    }>({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => { }
    })

    const handleEditSadPath = () => {
        if (!isEditMode) {
            setIsEditMode(true)
        } else {
            setIsEmailModalOpen(true)
        }
    }

    const handleSadPathDataChange = (newData: SadPathData[]) => {
        setSadPathData(newData)
        setHasUnsavedChanges(true)
    }

    const handleEmailSubmit = async (email: string) => {
        setIsLoading(true)
        try {
            // Check if user data already exists
            const { data: existingData, error: fetchError } = await supabase
                .from('user_analytics')
                .select('*')
                .eq('email', email)
                .single()

            if (fetchError && fetchError.code !== 'PGRST116') {
                throw fetchError
            }

            if (existingData) {
                setConfirmModal({
                    isOpen: true,
                    title: 'Overwrite Existing Data?',
                    message: 'Previous data found for this email! Do you want to overwrite it?',
                    type: 'warning',
                    onConfirm: async () => {
                        setConfirmModal({ ...confirmModal, isOpen: false })

                        // Update existing data
                        const { error: updateError } = await supabase
                            .from('user_analytics')
                            .update({
                                chart_data: { sadPathData },
                                updated_at: new Date().toISOString()
                            })
                            .eq('email', email)

                        if (updateError) throw updateError

                        setCurrentUserEmail(email)
                        setIsEmailModalOpen(false)
                        setIsEditMode(false)
                        setHasUnsavedChanges(false)
                        setIsLoading(false)
                        setToast({ message: 'Data saved successfully!', type: 'success' })
                    }
                })
                setIsLoading(false)
                return
            } else {
                // Insert new data
                const { error: insertError } = await supabase
                    .from('user_analytics')
                    .insert([{
                        email,
                        chart_data: { sadPathData },
                        updated_at: new Date().toISOString()
                    }])

                if (insertError) throw insertError
            }

            setCurrentUserEmail(email)
            setIsEmailModalOpen(false)
            setIsEditMode(false)
            setHasUnsavedChanges(false)
            setToast({ message: 'Data saved successfully!', type: 'success' })
        } catch (error) {
            console.error('Error saving data:', error)
            setToast({ message: 'Failed to save data. Please try again.', type: 'error' })
        } finally {
            setIsLoading(false)
        }
    }

    const handleLoadData = async (email: string) => {
        setIsLoading(true)
        try {
            const { data, error } = await supabase
                .from('user_analytics')
                .select('*')
                .eq('email', email)
                .single()

            if (error) {
                if (error.code === 'PGRST116') {
                    setToast({ message: 'No data found for this email.', type: 'error' })
                } else {
                    throw error
                }
                setIsLoading(false)
                return
            }

            if (data && data.chart_data && data.chart_data.sadPathData) {
                setSadPathData(data.chart_data.sadPathData)
                setCurrentUserEmail(email)
                setIsLoadModalOpen(false)
                setToast({ message: 'Data loaded successfully!', type: 'success' })
            }
        } catch (error) {
            console.error('Error loading data:', error)
            setToast({ message: 'Failed to load data. Please try again.', type: 'error' })
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancelEdit = () => {
        if (hasUnsavedChanges) {
            setConfirmModal({
                isOpen: true,
                title: 'Discard Changes?',
                message: 'You have unsaved changes. Are you sure you want to discard them?',
                type: 'danger',
                onConfirm: () => {
                    setIsEditMode(false)
                    setHasUnsavedChanges(false)
                    setSadPathData(defaultSadPathData)
                    setConfirmModal({ ...confirmModal, isOpen: false })
                }
            })
        } else {
            setIsEditMode(false)
        }
    }

    const handleValueChange = (index: number, newValue: number) => {
        const newData = [...sadPathData]
        newData[index].value = newValue
        handleSadPathDataChange(newData)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
            <DashboardHeader currentUserEmail={currentUserEmail} />

            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-8">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                    <MetricCard
                        icon={Phone}
                        iconColor="text-teal-400"
                        iconBgColor="bg-teal-400/10"
                        title="Total Calls"
                        value="12,847"
                        trend={12.5}
                        trendUp={true}
                    />
                    <MetricCard
                        icon={TrendingUp}
                        iconColor="text-green-400"
                        iconBgColor="bg-green-400/10"
                        title="Success Rate"
                        value="94.2%"
                        trend={2.1}
                        trendUp={true}
                    />
                    <MetricCard
                        icon={Clock}
                        iconColor="text-purple-400"
                        iconBgColor="bg-purple-400/10"
                        title="Avg Duration"
                        value="4m 32s"
                        trend={0.8}
                        trendUp={false}
                    />
                    <MetricCard
                        icon={AlertCircle}
                        iconColor="text-red-400"
                        iconBgColor="bg-red-400/10"
                        title="Failed Calls"
                        value="158"
                        trend={5.2}
                        trendUp={false}
                    />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                    <CallDurationChart data={defaultCallDurationData} />
                    <CallVolumeChart data={defaultCallVolumeData} />
                </div>

                {/* Failure Analysis */}
                <FailureAnalysis
                    data={sadPathData}
                    isEditMode={isEditMode}
                    hasUnsavedChanges={hasUnsavedChanges}
                    onEditClick={handleEditSadPath}
                    onCancelEdit={handleCancelEdit}
                    onLoadClick={() => setIsLoadModalOpen(true)}
                    onValueChange={handleValueChange}
                />
            </div>

            {/* Modals */}
            <EmailModal
                isOpen={isEmailModalOpen}
                onClose={() => setIsEmailModalOpen(false)}
                onSubmit={handleEmailSubmit}
                isLoading={isLoading}
                title="Save Your Data"
            />
            <EmailModal
                isOpen={isLoadModalOpen}
                onClose={() => setIsLoadModalOpen(false)}
                onSubmit={handleLoadData}
                isLoading={isLoading}
                title="Load Your Data"
            />

            {/* Toast Notification */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={confirmModal.isOpen}
                title={confirmModal.title}
                message={confirmModal.message}
                type={confirmModal.type}
                onConfirm={confirmModal.onConfirm}
                onCancel={() => setConfirmModal({ ...confirmModal, isOpen: false })}
            />
        </div>
    )
}

export default Dashboard
