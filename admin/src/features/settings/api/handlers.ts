import { useMutation, useQuery } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useApp } from '@/hooks/use-app'
import { PaginationResult } from '@/hooks/use-pagination-fetch'

export function useSettingsFromGroup(slug: string) {
  const {
    i18n: { language },
  } = useTranslation()
  const { request } = useApp()

  return useQuery({
    queryKey: [`settings-from-groups-${slug}-${language}`],
    queryFn: () =>
      request<PaginationResult<any>>({
        url: `/settings/groups/${slug}`,
      }),
  })
}

export function useSettingGroups() {
  const {
    i18n: { language },
  } = useTranslation()
  const { request } = useApp()

  return useQuery({
    queryKey: ['settings-from-groups', language],
    queryFn: () =>
      request<PaginationResult<any>>({
        url: '/settings/groups',
      }),
  })
}

export function useCreateSetting() {
  const { createSetting } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['post-setting'],
    mutationFn: createSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
      toast.success(`${moduleT('setting')} ${successT('create')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('create')} ${moduleT('setting')}` + error.message)
    },
  })
}

export function useDeleteSettings<T>() {
  const { deleteSettings } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['delete-setting'],
    mutationFn: deleteSettings<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
      toast.success(`${moduleT('setting')} ${successT('delete')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('delete')} ${moduleT('setting')}` + error.message)
    },
  })
}

export function useEditSetting() {
  const { editSetting } = requests()
  //const { t: moduleT } = useTranslation('module')
  //const { t: successT } = useTranslation('success')
  //const { t: errorT } = useTranslation('error')
  const {
    i18n: { language },
  } = useTranslation()

  return useMutation({
    mutationKey: ['edit-setting'],
    mutationFn: editSetting,
    onSuccess: () => {
      console.log('edit setting success')
      queryClient.invalidateQueries({
        queryKey: ['settings-from-groups', language],
      })
      toast.success(`edit setting success`)
    },
    onError: (error: any) => {
      toast.error(`error` + error.message)
    },
  })
}

export function useEditSettingSlug() {
  const { editSettingSlug } = requests()
  //const { t: moduleT } = useTranslation('module')
  //const { t: successT } = useTranslation('success')
  //const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-setting-slug'],
    mutationFn: editSettingSlug,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
      toast.success(`edit setting success`)
    },
    onError: (error: any) => {
      toast.error(`error` + error.message)
    },
  })
}
