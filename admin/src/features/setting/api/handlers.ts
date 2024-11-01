import { useApp } from '@/hooks/use-app'
import { PaginationResult } from '@/types/pagination-result'
import { queryClient } from '@/lib/query-provider'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { requests } from './requests'

export function useSettingFromGroup(slug: string) {
  const {
    i18n: { language },
  } = useTranslation()
  const { request } = useApp()

  return useQuery({
    queryKey: [`setting-from-group-${slug}-${language}`],
    queryFn: () =>
      request<PaginationResult<any>>({
        url: `/setting/group/${slug}`,
      }).then((res) => res.data),
  })
}

export function useSettingGroup() {
  const {
    i18n: { language },
  } = useTranslation()
  const { request } = useApp()

  return useQuery({
    queryKey: ['setting-from-group', language],
    queryFn: () =>
      request<PaginationResult<any>>({
        url: '/setting/group',
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
      queryClient.invalidateQueries({ queryKey: ['setting'] })
      toast.success(`${moduleT('setting')} ${successT('create')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('create')} ${moduleT('setting')}` + error.message)
    },
  })
}

export function useDeleteSetting<T>() {
  const { deleteSetting } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['delete-setting'],
    mutationFn: deleteSetting<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['setting'] })
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
        queryKey: ['setting-from-group', language],
      })
      toast.success(`edit setting success`)
    },
    onError: (error: any) => {
      toast.error(`error` + error.message)
    },
  })
}

export function useEditSettinglug() {
  const { editSettingSlug } = requests()
  //const { t: moduleT } = useTranslation('module')
  //const { t: successT } = useTranslation('success')
  //const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-setting-slug'],
    mutationFn: editSettingSlug,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['setting'] })
      toast.success(`edit setting success`)
    },
    onError: (error: any) => {
      toast.error(`error` + error.message)
    },
  })
}

export function useEditUserSettingSlug() {
  const { editUserSettingSlug } = requests()
  //const { t: moduleT } = useTranslation('module')
  //const { t: successT } = useTranslation('success')
  //const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-setting-slug'],
    mutationFn: editUserSettingSlug,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['setting'] })
      toast.success(`edit setting success`)
    },
    onError: (error: any) => {
      toast.error(`error` + error.message)
    },
  })
}

export function useSetting() {
  const { editMultipleSetting } = requests()
  //const { t: moduleT } = useTranslation('module')
  //const { t: successT } = useTranslation('success')
  //const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-setting'],
    mutationFn: editMultipleSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['setting'] })
      toast.success(`edit setting success`)
    },
    onError: (error: any) => {
      toast.error(`error` + error.message)
    },
  })
}
