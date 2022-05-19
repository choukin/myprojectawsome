// export const useCounters = useState('counter', () => Math.round(Math.random()*1000))
export const useColor = () => useState<string>('color', () => 'pink')