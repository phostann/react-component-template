import { type Response } from './../types/types'
import useSWR from 'swr'

export enum ConfigValueType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  IMAGE = 'image',
  VIDEO = 'video'
}

export interface ConfigValue {
  type: ConfigValueType
  value: string | number | boolean
  key: string
}

export interface Config {
  id: number
  group_id: number
  name: string
  values: ConfigValue[]
  created_at: string
  updated_at: string
}

export const useConfig = (): Config | undefined => {
  const configId = 1
  const { data } = useSWR<Response<Config>>(`/config/${configId}`)

  return data?.data
}

export const useConfigValue = (key: string): ConfigValue | undefined => {
  const config = useConfig()

  return config?.values.find((value) => value.key === key)
}
