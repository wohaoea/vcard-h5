<template>
  <div>
    <a class="nui-cell nui-flex clearfix" :href="href">
      <div class="nui-cell-left nui-flex1">
        <slot name="left"></slot>
      </div>
      <div class="nui-cell-wrap nui-flex2">
        <slot>
          <span v-text="value"></span>
        </slot>
      </div>
      <slot name="right"></slot>
      <i v-if="isLink" class="nui-cell-arrows-right" :style="{'color':arrowsColor}"></i>
    </a>
    <slot name="bottom">
      <div class="nui-cell-bottom"></div>
    </slot>
  </div>
</template>

<script>
    export default {
        name: 'nui-cell',
        props: {
          to: [String, Object],
          isLink: Boolean,
          arrowsColor: String,
          value:String
        },
        computed: {
          href() {
            var _this = this;
            if (this.to && !this.added && this.$router) {
              const resolved = this.$router.match(this.to);
              if (!resolved.matched.length) return this.to;
              this.$nextTick(() => {
                this.added = true;
                this.$el.addEventListener('click', this.handleClick);
              });
              return resolved.path;
            }
            return this.to;
          }
        },
        methods: {
          handleClick($event) {
            $event.preventDefault();
            this.$router.push(this.href);
          }
        }
    }
</script>

<style scoped>
  .nui-cell{
    position: relative;
    background-color: inherit;
    box-sizing: border-box;
    color: inherit;
    padding: 0.3rem 0.25rem .22rem;
    overflow: hidden;
    position: relative;
    text-decoration: none;
  }
  .nui-cell-left {
    text-align: left;
    color: #fff;
    font-size: .28rem;
    /*float: left;*/
  }
  .nui-cell-wrap{
    color: #ffffff;
    text-align: left;
    font-size:0.25rem;
  }
  .nui-cell-right{
    line-height: 1;
    /*float: right;*/
  }
  .nui-cell-arrows-right{

  }
  .nui-cell-arrows-right:after {
    border: 1px solid;
    border-bottom-width: 0;
    border-left-width: 0;
    content: " ";
    top: 50%;
    right: 0.3rem;
    position: absolute;
    width: 8px;
    height: 8px;
    -webkit-transform: translateY(-50%) rotate(45deg);
    transform: translateY(-50%) rotate(45deg);
  }
  .nui-cell-bottom {
    margin: 0 0.25rem;
    border-bottom: 1px solid rgba(255,255,255,0.4);
  }
</style>
