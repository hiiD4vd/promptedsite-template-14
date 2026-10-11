// @ts-nocheck
import * as THREE from 'three'

import { Resize } from '@/utils/subscribable'
import { Raf } from '@/utils/subscribable'

import Renderer from '@/engine/Renderer'

import World from '@/engine/SceneManager'

import Audio from '@/engine/AudioEngine'

import Time from '@/engine/Time'
import Sizes from '@/engine/Sizes'
import Debug from '@/engine/Debug'
import Mouse from '@/engine/Mouse'
import ShaderChunks from '@/engine/ShaderChunks'

import Assets from '@/engine/AssetLoader'

let instance = null

export default class Gl {
  constructor(_params) {
    /* 
      Singleton
    */
    if (instance) {
      if (_params?.canvas && !instance.canvas) {
        instance.params = _params
        instance.canvas = document.querySelector(_params.canvas)
      }
      return instance
    }

    instance = this

    /* 
      Params & Defaults
    */
    this.params = _params || { canvas: '[data-gl-canvas]' }

    /* 
      Get Debug 
    */
    this.urlParams = new URLSearchParams(window.location.search)
    this.isDebug = this.urlParams.has('debug')

    /* 
      Flags
    */
    this.isLoaded = false

    /* 
      Canvas
    */
    this.canvas = document.querySelector(this.params.canvas || '[data-gl-canvas]')

    /* 
      Audio
    */
    this.audio = new Audio()

    /* 
      Utils
    */
    this.time = new Time()
    this.sizes = new Sizes()
    this.mouse = new Mouse()
    this.shaderChunks = new ShaderChunks()

    /* 
      Renderer
    */
    this.renderer = new Renderer()

    /* 
      Scene & Camera
    */
    this.scene = new THREE.Scene()
    this.camera = new THREE.Camera()

    /* 
      Assets
    */
    this.assets = new Assets()

    /* 
      Resize
    */
    Resize.subscribe(this.resize.bind(this))
  }

  init(_initScene) {
    if (this.isDebug) this.debug = new Debug()

    this.world = new World({
      initScene: _initScene,
    })

    Raf.subscribe(() => {
      this.update()
    })

    this.isLoaded = true

    this.audio.init()

    this.resize()
  }

  load() {
    this.addRenderer()

    return new Promise((_resolve) => {
      Promise.all([this.assets.load()]).then(() => {
        _resolve()
      })
    })
  }

  loadDOM() {
    return new Promise((_resolve) => {
      if (document.readyState === 'interactive') {
        console.log('[WebGL] [ █ █         ] -', 'DOM loaded')

        // this.addRenderer()

        _resolve()
      } else {
        document.addEventListener('DOMContentLoaded', () => {
          console.log('[WebGL] [ █ █         ] -', 'DOM loaded')

          // this.addRenderer()

          _resolve()
        })
      }
    })
  }

  addRenderer() {}

  update() {
    // this.assets.update()

    if (this.isLoaded) {
      this.renderer.update()
      this.world.update()
      this.mouse.update()
      this.audio.update()

      if (this.isDebug) this.debug.update()
    }
  }

  resize() {
    this.mouse.resize()
    this.sizes.resize()

    if (this.isLoaded) {
      this.renderer.resize()
      this.world.resize()
    }
  }
}
