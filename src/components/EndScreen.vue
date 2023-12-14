<script setup lang="ts">
import { onMounted } from 'vue'
import RiveAnimation from './rive-animation.vue'
import animationAsset from '../assets/animations/winning_screen.riv?url'
import type { Event } from '@rive-app/canvas'
import { gameState } from '../game/gameState.ts'

onMounted(function () {})

const returnToLobby = function () {
    gameState.isGameOver = false
    gameState.hasStarted = false
    gameState.hasWon = false
}

const handleAnimationStateChange = function (event: Event) {
    if (!Array.isArray(event.data) || !event.data[0]) {
        return
    }
    const eventString = event.data[0]

    if (eventString === 'Lobby') {
        returnToLobby()
        return
    }

    if (eventString === 'Credit') {
        console.log('show credits')
        return
    }
}
</script>

<template>
    <div class="end-screen">
        <rive-animation
            class="rive-animation"
            :src="animationAsset"
            :state-machines="['state_machine']"
            @state-change="(event) => handleAnimationStateChange(event)"
        />
    </div>
</template>

<style scoped>
.end-screen {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: lightblue;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-flow: column;
}

.rive-animation {
    position: absolute;
    inset: 0;
}
</style>
