"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

export default function MirenViewer() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 600 / 900, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })

    renderer.setSize(600, 900)
    renderer.setClearColor(0x000000, 0)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 2.0

    scene.fog = new THREE.Fog(0x000000, 8, 20)

    mountRef.current.appendChild(renderer.domElement)

    camera.position.set(0, 0.5, 3.5)
    camera.lookAt(0, 0.5, 0)

    const ambientLight = new THREE.AmbientLight(0xb8b8b8, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.2)
    directionalLight.position.set(4, 8, 4)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 4096
    directionalLight.shadow.mapSize.height = 4096
    directionalLight.shadow.camera.near = 0.1
    directionalLight.shadow.camera.far = 50
    directionalLight.shadow.camera.left = -10
    directionalLight.shadow.camera.right = 10
    directionalLight.shadow.camera.top = 10
    directionalLight.shadow.camera.bottom = -10
    scene.add(directionalLight)

    const rimLight = new THREE.DirectionalLight(0xd8d8d8, 1.5)
    rimLight.position.set(-6, 3, -4)
    scene.add(rimLight)

    const fillLight = new THREE.DirectionalLight(0xc8c8c8, 0.5)
    fillLight.position.set(0, -2, 3)
    scene.add(fillLight)

    const accentLight = new THREE.PointLight(0xffffff, 0.7, 10)
    accentLight.position.set(2, 2, 2)
    scene.add(accentLight)

    const accentLight2 = new THREE.PointLight(0xe0e0e0, 0.5, 10)
    accentLight2.position.set(-2, 3, -2)
    scene.add(accentLight2)

    const groundGeometry = new THREE.PlaneGeometry(20, 20)
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.4 })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -1.5
    ground.receiveShadow = true
    scene.add(ground)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.enableZoom = true
    controls.enablePan = false
    controls.maxPolarAngle = Math.PI / 1.5
    controls.minPolarAngle = Math.PI / 6
    controls.minDistance = 2.5
    controls.maxDistance = 7
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.4
    controls.target.set(0, 0.5, 0)

    const loader = new GLTFLoader()
    loader.load(
      "/models/miren.glb",
      (gltf) => {
        const model = gltf.scene

        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())

        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 2.5 / maxDim
        model.scale.setScalar(scale)

        model.position.set(-center.x * scale, -center.y * scale + 0.5, -center.z * scale)

        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true
            child.receiveShadow = true

            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((mat) => {
                  if (mat instanceof THREE.MeshStandardMaterial) {
                    mat.envMapIntensity = 2.2
                    mat.roughness = Math.max(mat.roughness * 0.25, 0.08)
                    mat.metalness = Math.min(mat.metalness * 3.0, 1.0)
                    // Desaturate and brighten for silver look
                    if (mat.color) {
                      const hsl = mat.color.getHSL({ h: 0, s: 0, l: 0 })
                      mat.color.setHSL(hsl.h, hsl.s * 0.2, hsl.l * 1.3)
                    }
                    mat.needsUpdate = true
                  }
                })
              } else if (child.material instanceof THREE.MeshStandardMaterial) {
                child.material.envMapIntensity = 2.2
                child.material.roughness = Math.max(child.material.roughness * 0.25, 0.08)
                child.material.metalness = Math.min(child.material.metalness * 3.0, 1.0)
                if (child.material.color) {
                  const hsl = child.material.color.getHSL({ h: 0, s: 0, l: 0 })
                  child.material.color.setHSL(hsl.h, hsl.s * 0.2, hsl.l * 1.3)
                }
                child.material.needsUpdate = true
              }
            }
          }
        })

        scene.add(model)
        setIsLoading(false)
      },
      (progress) => {
        const progressPercent = (progress.loaded / progress.total) * 100
        setLoadingProgress(progressPercent)
      },
      (error) => {
        console.error("Error loading model:", error)
        setIsLoading(false)
      },
    )

    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      const width = 600
      const height = 900
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      controls.dispose()
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry?.dispose()
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose())
          } else {
            object.material?.dispose()
          }
        }
      })

      renderer.dispose()
    }
  }, [])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div ref={mountRef} className="w-[600px] h-[800px] rounded-lg overflow-hidden" />
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm rounded-lg">
          <div className="text-white animate-pulse mb-4 text-lg font-mono tracking-wider">Loading Miren...</div>
          <div className="w-64 h-2 bg-gray-800 rounded-full mb-2 overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-gray-400 via-white to-gray-400 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <div className="text-gray-400 text-sm font-mono">{Math.round(loadingProgress)}%</div>
        </div>
      )}
    </div>
  )
}
