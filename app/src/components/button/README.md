# nui-button

# 用法：
<nui-button
  type="fill"    // fill：宽度100%  empty：空心按钮  solid：实心按钮
  title="返回"    // 按钮文字
  :number="number"   // 动态显示的数字
  is-fill         // 是否固定在底部
  is-mini          // 是否是小按钮
  @click.native="back">    // 绑定按钮点击事件
</nui-button>

