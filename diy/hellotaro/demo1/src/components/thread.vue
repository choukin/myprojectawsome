<template>
    <view class="thread" @tap="handleNavigate">
        <view class="info">
            <view>
                <image :src="member.avatar_large|url" class="avatar">
            </view>
            <view class="middle">
                <view :class="usernameCls">
                    {{member.username}}
                </view>
                <view class="replies">
                    <text class="mr10">{{time}}</text>
                    <text >评论{{replies}}</text>
                </view>                   
            </view>    
            <view class="node">
                <text class="tag">{{node.title}}</text>
            </view>
        </view>
        <text class="title">{{title}}</text>
    </view>    
</template>