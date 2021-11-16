import axios, { AxiosRequestConfig } from 'axios'
declare module 'axios' {
  interface AxiosRequestConfig {
    retry?: boolean
    tokenflag?: boolean
  }
}
