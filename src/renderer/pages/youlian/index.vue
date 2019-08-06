<template>
    <!-- <div>
        <div>
            <router-link to="/admin/bashboard">控制台</router-link>
            <router-link to="/admin/youlian">加油</router-link>
        </div>
            <div class="left">    
                    <ul>
                        <li>
                           <router-link to="/admin/youlian/pay"> 增加用户</router-link>
                        </li>
        
        
                        <li>
                             <router-link to="/admin/youlian/load"> 用户列表</router-link>
                        </li>
                    </ul>
        
        
            
                </div>
        
                <div class="right">    
        
                     <router-view></router-view>
        
        
                 </div>
    </div> -->
    <router-view></router-view>
</template>
<script>
    export default {
        data () {
            return {
                msg: 'youlian page'
            }
        }
    }
</script>