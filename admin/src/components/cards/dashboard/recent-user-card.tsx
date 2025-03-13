'use client'

import { useEffect, useState } from 'react'
import { Calendar, Mail } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useApp } from '@/hooks/use-app'
import { useQuery } from '@tanstack/react-query'
import { Person } from '@/types'
import { formatDate } from '@/lib/date-string'

export default function RecentPersons() {
  const { request } = useApp()
  const [person, setPerson] = useState<Person[]>([])
  const { data, isLoading } = useQuery({
    queryKey: ['recent-persons'],
    queryFn: () =>
      request<any[]>({
        url: `/person?sortOrder=desc&pageSize=10`,
      }),
  })

  useEffect(() => {
    if (data) {
      setPerson((data.data as any).data)
    }
  }, [data])
  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-xl'>Usuários Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className='space-y-3'>
            {[...Array(10)].map((_, i) => (
              <div key={i} className='flex items-center space-x-4'>
                <Skeleton className='h-12 w-full' />
              </div>
            ))}
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>Data de criação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {person.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell>
                      <div className='font-medium'>{person.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-1'>
                        <Mail className='h-4 w-4 text-muted-foreground' />
                        <span>
                          {
                            person.person_contact?.find(
                              (contact) => contact.type_id === 2
                            )?.value
                          }
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span>
                        {
                          person.person_contact?.find(
                            (contact) => contact.type_id === 1
                          )?.value
                        }
                      </span>
                    </TableCell>
                    <TableCell>
                      <span>
                        {
                          person.person_document?.find(
                            (document) => document.type_id === 2
                          )?.value
                        }
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center'>
                        <Calendar className='mr-1 h-3 w-3 text-muted-foreground' />
                        {formatDate(String(person.created_at))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
