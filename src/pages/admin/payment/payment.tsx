import { useState, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table'
import { Badge } from '../../../components/ui/badge'
import {
  DollarSign,
  Clock,
  TrendingUp,
  XCircle,
  Search,
  Download,
  Loader2,
} from 'lucide-react'
import { usePaymentStats } from '../service/query/usePayment'

export const Payment = () => {
  const { data, isLoading, isError } = usePaymentStats()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [providerFilter, setProviderFilter] = useState('all')

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-[80vh]'>
        <Loader2 className='w-10 h-10 animate-spin text-blue-600' />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className='flex items-center justify-center h-[80vh]'>
        <div className='text-center'>
          <XCircle className='w-16 h-16 text-red-500 mx-auto mb-4' />
          <p className='text-xl font-semibold'>Ma'lumotlarni yuklashda xatolik</p>
        </div>
      </div>
    )
  }

  const stats = data.data

  const filteredTransactions = stats.transactions.filter((t: { student: { name: string }; teacher: { name: string }; status: string; provider: string }) => {
    const matchesSearch = searchQuery === '' ||
      t.student?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.teacher?.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter
    const matchesProvider = providerFilter === 'all' || t.provider === providerFilter

    return matchesSearch && matchesStatus && matchesProvider
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      COMPLETED: { label: 'Success', className: 'bg-green-100 text-green-700' },
      PENDING: { label: 'Pending', className: 'bg-yellow-100 text-yellow-700' },
      CANCELLED: { label: 'Canceled', className: 'bg-red-100 text-red-700' },
      FAILED: { label: 'Failed', className: 'bg-gray-100 text-gray-700' },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING

    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    )
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Payments</h1>
          <p className='text-gray-500 mt-1'>Manage and monitor all payment transactions</p>
        </div>
        <Button className='flex items-center gap-2'>
          <Download className='w-4 h-4' />
          Export
        </Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium text-gray-600'>
              Total Revenue
            </CardTitle>
            <DollarSign className='w-5 h-5 text-green-600' />
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-bold'>{stats.totalRevenue.toLocaleString()} so'm</div>
            <p className='text-xs text-gray-500 mt-1'>{stats.completedCount} paid transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium text-gray-600'>
              Pending Payments
            </CardTitle>
            <Clock className='w-5 h-5 text-yellow-600' />
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-bold'>{stats.pendingAmount.toLocaleString()} so'm</div>
            <p className='text-xs text-gray-500 mt-1'>{stats.pendingPayments} pending</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium text-gray-600'>
              Success Rate
            </CardTitle>
            <TrendingUp className='w-5 h-5 text-blue-600' />
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-bold'>{stats.successRate}%</div>
            <p className='text-xs text-gray-500 mt-1'>{stats.completedCount} of {stats.totalTransactions}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium text-gray-600'>
              Canceled
            </CardTitle>
            <XCircle className='w-5 h-5 text-red-600' />
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-bold'>{stats.canceledAmount.toLocaleString()} so'm</div>
            <p className='text-xs text-gray-500 mt-1'>{stats.canceledCount} canceled</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Search className='w-5 h-5' />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <Input
              placeholder='Search by student, teacher, ID...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='md:col-span-2'
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder='All States' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All States</SelectItem>
                <SelectItem value='COMPLETED'>Success</SelectItem>
                <SelectItem value='PENDING'>Pending</SelectItem>
                <SelectItem value='CANCELLED'>Canceled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={providerFilter} onValueChange={setProviderFilter}>
              <SelectTrigger>
                <SelectValue placeholder='All Providers' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Providers</SelectItem>
                <SelectItem value='Click'>Click</SelectItem>
                <SelectItem value='Payme'>Payme</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {(searchQuery || statusFilter !== 'all' || providerFilter !== 'all') && (
            <Button
              variant='outline'
              size='sm'
              className='mt-3'
              onClick={() => {
                setSearchQuery('')
                setStatusFilter('all')
                setProviderFilter('all')
              }}
            >
              Reset Filters
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Transactions
            <span className='ml-2 text-sm font-normal text-gray-500'>
              {filteredTransactions.length} total transactions
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length === 0 ? (
            <div className='text-center py-12'>
              <XCircle className='w-12 h-12 text-gray-400 mx-auto mb-3' />
              <p className='text-gray-500'>No transactions found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-37.5'>Date</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead className='text-right'>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction: { id: Key | null | undefined; date: string | number | Date; student: { name: any }; teacher: { name: any }; amount: any; status: string; provider: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => (
                  <TableRow key={transaction.id}>
                    <TableCell className='font-medium'>
                      {new Date(transaction.date).toLocaleDateString('uz-UZ')}
                    </TableCell>
                    <TableCell>{transaction.student?.name || 'N/A'}</TableCell>
                    <TableCell>{transaction.teacher?.name || 'N/A'}</TableCell>
                    <TableCell className='text-right font-semibold'>
                      {Number(transaction.amount).toLocaleString()} so'm
                    </TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell>
                      <Badge variant='outline'>{transaction.provider}</Badge>
                    </TableCell>
                    <TableCell className='text-right'>
                      <Button variant='ghost' size='sm'>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          <div className='mt-4 text-sm text-gray-500 text-center'>
            Showing 0 to {filteredTransactions.length} of {stats.totalTransactions} results
            <span className='ml-4'>Show: 20 per page</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}