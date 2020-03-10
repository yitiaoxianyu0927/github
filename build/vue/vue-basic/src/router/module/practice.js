
const router = [{
    path: '/ElementTable',
    name: 'ElementTable',
    component:()=>import('@/view/practice/table/ElementTable')
  },{
    path: '/ElementForm',
    name: 'ElementForm',
    component:()=>import('@/view/practice/table/ElementForm')
  },{
    path: '/word',
    name: 'word',
    component:()=>import('@/view/practice/table/word')
  },{
    path: '/node',
    name: 'node',
    component:()=>import('@/view/practice/table/node')
  },
  {
    path: '/timemap',
    name: 'timemap',
    component:()=>import('@/view/practice/chart/timemap')
  },
  {
    path: '/drillmap',
    name: 'drillmap',
    component:()=>import('@/view/practice/chart/drillmap')
  },
  {
    path: '/dynamicchart',
    name: 'dynamicchart',
    component:()=>import('@/view/practice/chart/dynamicchart')
  },
  {
    path: '/maptalks',
    name: 'maptalks',
    component:()=>import('@/view/practice/map/maptalks')
  },
  {
    path: '/kettle',
    name: 'kettle',
    component:()=>import('@/view/practice/Integrate/kettle')
  },{
    path: '/browerApi',
    name: 'browerApi',
    component:()=>import('@/view/practice/origin/browerApi')
  },{
    path: '/performanceList',
    name: 'performanceList',
    component:()=>import('@/view/practice/performance/performanceList')
  }]

  
export default router;  