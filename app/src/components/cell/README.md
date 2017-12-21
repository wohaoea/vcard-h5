# nui-cell

# 用法：
<nui-cell
  :to="{name:'Hello'}"      // 跳转地址  {name:''}:vue的路由地址跳转到相应路由  否则作为a标签链接处理
  is-link                  // 是否显示箭头
  arrows-color="#ffffff"   // 箭头颜色
  value="账单查询">

    <xx solt="left"></xx>  // 显示在左侧区域
    <xx solt="right"></xx>  // 显示在右侧区域
    <xx></xx>  // 替换value  为自定义内容
    <xx solt="bottom"></xx>  // 下边界

</nui-cell>

