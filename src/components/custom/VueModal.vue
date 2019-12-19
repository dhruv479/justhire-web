<template>
  <div
    class="vue-modal"
    :class="{'vuexplosive-modal-hidden': !active, 'vuexplosive-modal-visible': active}"
    @keydown="checkKeyEvent"
    tabindex="-1"
    :aria-hidden="!active"
    v-if="active"
    role="dialog"
  >
    <transition name="scale">
      <div class="vue-modal-container" ref="modalContainer">
        <div class="vue-modal-inner">
          <div class="vue-modal-header">
            <h2 class="vue-modal-title">
              <slot name="title"></slot>
            </h2>
            <button
              class="vue-modal-close"
              @click="modalToggle"
              v-html="closeIcon"
              aria-label="close"
              type="button"
              tabindex="-1"
            ></button>
          </div>

          <div class="vue-modal-content">
            <slot name="body"></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>


<script>
/* eslint-disable */
export default {
  name: "VuexplosionModal",
  props: {
    visible: {
      default: false
    },
    closeIcon: {
      default: `<span>✖</span>`
    }
  },
  data: function() {
    return {
      active: false
    };
  },
  methods: {
    modalToggle() {
      this.$emit("close");
    },
    checkKeyEvent(event) {
      // close modal and return early if escape
      if (event.key === "Escape") {
        this.modalToggle();
        return;
      }
      const focusableList = this.$refs.modalContainer.querySelectorAll(
        'button:enabled, [href], input:enabled, select:enabled, textarea:enabled, [tabindex]:not([tabindex="-1"])'
      );
      // escape early if only 1 or no elements to focus
      if (focusableList.length < 2 && event.key === "Tab") {
        event.preventDefault();
        return;
      }
      const last = focusableList.length - 1;
      if (
        event.key === "Tab" &&
        event.shiftKey === false &&
        event.target === focusableList[last]
      ) {
        event.preventDefault();
        focusableList[0].focus();
      } else if (
        event.key === "Tab" &&
        event.shiftKey === true &&
        event.target === focusableList[1]
      ) {
        event.preventDefault();
        focusableList[last].focus();
      }
    }
  },
  watch: {
    visible(value) {
      this.active = !this.active;
      if (value === true) {
        this.$nextTick(() => {
          const list = this.$refs.modalContainer.querySelectorAll(
            'button:enabled, [href], input:enabled, select:enabled, textarea:enabled, [tabindex]:not([tabindex="-1"])'
          );
          // const list = $(':focusable');
          if (list.length > 1) {
            list[1].focus({ preventScroll: false });
          }
        });
      }
    }
  }
};
</script>


<style scoped>
.vue-modal {
  font-family: -apple-system, BlinkMacSystemFont, "avenir next", avenir,
    "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial,
    sans-serif;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.6s ease;
}
/* ::-webkit-scrollbar {
  width: 0px; 
  background: transparent;
} */
.vue-modal-container {
  background: #fff;
  max-height: 80%;
  overflow-y: auto;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  padding: 15px;
  border-radius: 5px;
}
.vue-modal-inner {
  padding: 10px;
}
.vue-modal-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.vue-modal-title {
  font-size: 25px;
  padding-left: 15px;
}

.vue-modal-close {
  align-self: flex-start;
  font-size: 25px;
  color: rgb(105, 105, 105);
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 300;
}

.vue-modal-content {
  font-size: 17px;
  color: #666;
  padding-left: 15px;
}

.vuexplosive-modal-hidden {
  display: none;
}
.vuexplosive-modal-visible {
  display: block;
}

.vue-modal-bg {
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  z-index: 1;
}

.vue-modal-explosion-gif {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  min-width: 50%;
  min-height: 50%;
  opacity: 1;
  width: 100%;
  max-width: 100%;
  height: auto;
}

.vue-modal-footer {
  margin-top: 20px;
}

.vue-modal-hidden {
  display: none;
}
.vue-modal-visible {
  display: block;
}

.scale-enter-active {
  animation: bounce-in 0.3s;
}
.scale-leave-active {
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
