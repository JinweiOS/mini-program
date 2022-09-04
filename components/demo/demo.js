// components/demo/demo.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: String,
      value: '哈哈哈'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function() {
      this.triggerEvent('click', {child: '子组件想要传递的数据'})
    }
  }
})
