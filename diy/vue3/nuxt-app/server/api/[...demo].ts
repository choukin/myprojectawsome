export default defineEventHandler(event=>({
    path:`/api/${event.context.params.demo}`,
    query:useQuery(event)
}))