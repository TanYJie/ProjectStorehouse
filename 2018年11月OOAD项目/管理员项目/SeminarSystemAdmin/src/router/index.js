import Vue from 'vue'
import Router from 'vue-router'
import teacher from '@/components/teacher'
import student from '@/components/student'
import modifyTeacher from '@/components/modifyTeacher'
import modifyStudent from '@/components/modifyStudent'
import createTeacher from '@/components/createTeacher'
import login from '@/components/login'
import loginError from '@/components/loginError'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/teacher',
      name: 'teacher',
      component: teacher
    },
    {
      path: '/student',
      name: 'student',
      component: student
    },
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/loginError',
      name: 'loginError',
      component: loginError
    },
    {
      path: '/modifyTeacher',
      name: 'modifyTeacher',
      component: modifyTeacher
    },
    {
      path: '/modifyStudent',
      name: 'modifyStudent',
      component: modifyStudent
    },
    {
      path: '/createTeacher',
      name: 'createTeacher',
      component: createTeacher
    },
  ]
})
