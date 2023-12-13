<template>
  <div>
    <div class="container">
      <canvas ref="canvas" class="canvas"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Event, RiveParameters } from "@rive-app/canvas";
import { Alignment, Fit, Layout, Rive } from "@rive-app/canvas";
import { onMounted, onUnmounted, ref } from "vue";

const props = withDefaults(
  defineProps<{
    /**
     * To load a static project asset use Vite's explicit URL imports.
     *
     * `import assetSrc from 'app/assets/asset.riv?url'`
     */
    src?: RiveParameters["src"];
    buffer?: RiveParameters["buffer"];
    artboard?: RiveParameters["artboard"];
    animations?: RiveParameters["animations"];
    stateMachines?: RiveParameters["stateMachines"];
    fit?: Exclude<Fit, Fit.FitHeight | Fit.FitWidth>;
    alignment?: Alignment;
    autoplay?: RiveParameters["autoplay"];
    fallbackSrc?: string;
    textReplacements?: { [key: string]: string };
    noLoadingImage?: boolean;
  }>(),
  {
    src: undefined,
    buffer: undefined,
    artboard: undefined,
    animations: undefined,
    stateMachines: undefined,
    fit: Fit.Contain,
    alignment: Alignment.Center,
    autoplay: true,
    fallbackSrc: undefined,
    textReplacements: undefined,
  },
);

const emits = defineEmits<{
  (e: "load", event: Event, controls: Rive): void;
  (e: "load-error", event: Event): void;
  (e: "play", event: Event): void;
  (e: "pause", event: Event): void;
  (e: "stop", event: Event): void;
  (e: "loop", event: Event): void;
  (e: "state-change", event: Event): void;
}>();

let controls: Rive;

const canvas = ref<HTMLCanvasElement>();

const supported = ref(true);
const loaded = ref(false);

onMounted(() => {
  if (!canvas.value) {
    return;
  }

  controls = new Rive({
    canvas: canvas.value,
    src: props.src,
    buffer: props.buffer,
    artboard: props.artboard,
    animations: props.animations,
    stateMachines: props.stateMachines,
    layout: new Layout({ fit: props.fit, alignment: props.alignment }),
    autoplay: props.autoplay,
    onLoad: (event) => {
      controls.resizeDrawingSurfaceToCanvas();
      if (props.textReplacements) {
        Object.entries(props.textReplacements).forEach(([key, replacement]) =>
          controls.setTextRunValue(key, replacement),
        );
      }
      loaded.value = true;
      emits("load", event, controls);
    },
    onLoadError: (event) => {
      supported.value = false;
      emits("load-error", event);
    },
    onPlay: (event) => emits("play", event),
    onPause: (event) => emits("pause", event),
    onStop: (event) => emits("stop", event),
    onLoop: (event) => emits("loop", event),
    onStateChange: (event) => emits("state-change", event),
  });
});

onUnmounted(() => {
  if (!supported.value) {
    return;
  }
  try {
    controls?.cleanup();
  } catch (error) {
    console.warn("Could not clean up rive animation", error);
  }
});
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
}
.canvas {
  width: 100%;
  height: 100%;
}
</style>
