import Task from './Tack.vue'

import {action} from '@storybook/addon-actions'

export default{
    component:Task,
    // 👇 导出扩展名Data story 本身需要但是不用在 Storybook 应用中渲染的信息。
    excludeStories:/.*Data$/,
    title:'Task', // 在 Storybook 应用侧边栏的显示,
    // 👇 事件回映射到StoryBook的UI
    argTypes: {
        onPinTask:{},
        onArchiveTask:{}
    }
}

export const actionsData = {
    onPintask: action('pin-task'),
    onArchiveTask: action('archive-task')
}

const Template = args =>({
    components:{Task},
    setup(){
        return {args,...actionsData}
    },
    template:'<Task v-bind="args">'
})

export const Default = Template.bind({})

Default.args = {
    task:{
        id:'1',
        title:'test Task',
        state:'TASK_INBOX',
        updateAt: new Date(2018,0,1,9,0)
    }
}

export const Pinned = Template.bind({})

Pinned.args = {
    task:{
        ...Default.args.task,
        state:'TASK_PINNED'
    }
}

export const Archived = Template.bind({})

Archived.args = {
    task:{
        ...Default.args.task,
        state:'TASK_ARCHIVED'
    }
}