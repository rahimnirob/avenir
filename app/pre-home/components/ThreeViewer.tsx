"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

export default function ThreeViewer() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 600 / 900, 0.1, 1000)
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
    renderer.toneMappingExposure = 1.5

    // Subtle dark fog
    scene.fog = new THREE.Fog(0x1a1a1a, 10, 25)

    mountRef.current.appendChild(renderer.domElement)

    // Camera positioned to see full character centered
    camera.position.set(0, 1, 4)
    camera.lookAt(0, 0.8, 0)

    // Lighting setup - dramatic dark theme for white character
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3)
    scene.add(ambientLight)

    // Main key light - strong to highlight white character
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5)
    keyLight.position.set(5, 10, 5)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.width = 4096
    keyLight.shadow.mapSize.height = 4096
    keyLight.shadow.camera.near = 0.1
    keyLight.shadow.camera.far = 50
    keyLight.shadow.camera.left = -10
    keyLight.shadow.camera.right = 10
    keyLight.shadow.camera.top = 10
    keyLight.shadow.camera.bottom = -10
    keyLight.shadow.bias = -0.0001
    scene.add(keyLight)

    // Rim light from behind - sharp contrast
    const rimLight = new THREE.DirectionalLight(0xe0e0e0, 1.2)
    rimLight.position.set(-5, 3, -5)
    scene.add(rimLight)

    // Fill light - subtle
    const fillLight = new THREE.DirectionalLight(0x606060, 0.3)
    fillLight.position.set(-3, 0, 5)
    scene.add(fillLight)

    // Bottom bounce light - minimal
    const bounceLight = new THREE.DirectionalLight(0x505050, 0.2)
    bounceLight.position.set(0, -5, 3)
    scene.add(bounceLight)

    // Ground plane - darker for more contrast
    const groundGeometry = new THREE.PlaneGeometry(30, 30)
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.6 })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -1
    ground.receiveShadow = true
    scene.add(ground)

    // Controls - initialize AFTER renderer is added to DOM
    let controls: OrbitControls | null = null
    
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.05
      controls.enableZoom = true
      controls.enablePan = false
      controls.minPolarAngle = Math.PI / 4
      controls.maxPolarAngle = Math.PI / 1.8
      controls.minDistance = 2.5
      controls.maxDistance = 8
      controls.autoRotate = true
      controls.autoRotateSpeed = 0.8
      controls.target.set(0, 0.8, 0)
      controls.update()
    }, 100)

    // Load model
    const loader = new GLTFLoader()
    loader.load(
      "/models/miren.glb",
      (gltf) => {
        const model = gltf.scene

        // Calculate proper centering
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())

        // Scale model to fit nicely
        const maxDim = Math.max(size.x, size.y, size.z)
        const targetSize = 3.5
        const scale = targetSize / maxDim
        
        model.scale.setScalar(scale)

        // Center model at origin, then position it
        model.position.x = -center.x * scale
        model.position.y = -box.min.y * scale - 1
        model.position.z = -center.z * scale

        // Enhance materials
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true
            child.receiveShadow = true
            
            if (child.material) {
              const materials = Array.isArray(child.material) ? child.material : [child.material]
              materials.forEach(mat => {
                if (mat instanceof THREE.MeshStandardMaterial) {
                  mat.envMapIntensity = 1.0
                  mat.roughness = Math.min(mat.roughness * 1.05, 1)
                  mat.metalness = Math.max(mat.metalness * 0.95, 0)
                  mat.needsUpdate = true
                }
              })
            }
          }
        })

        scene.add(model)
        setIsLoading(false)

        // Adjust camera to frame model better after loading
        const height = size.y * scale
        camera.position.set(0, height * 0.5, height * 1.2)
        camera.lookAt(0, height * 0.4, 0)
        if (controls) {
          controls.target.set(0, height * 0.4, 0)
          controls.update()
        }
      },
      (progress) => {
        if (progress.total > 0) {
          const progressPercent = (progress.loaded / progress.total) * 100
          setLoadingProgress(progressPercent)
        }
      },
      (error) => {
        console.error("Error loading model:", error)
        setIsLoading(false)
      }
    )

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      if (controls) {
        controls.update()
      }
      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    const handleResize = () => {
      const width = 600
      const height = 900
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      if (controls) {
        controls.update()
      }
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (controls) {
        controls.dispose()
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry?.dispose()
          const materials = Array.isArray(object.material) ? object.material : [object.material]
          materials.forEach(material => material?.dispose())
        }
      })
      
      renderer.dispose()
    }
  }, [])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div ref={mountRef} className="w-[600px] h-[800px] rounded-lg overflow-hidden" />
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800/50 backdrop-blur-sm rounded-lg">
          <div className="text-gray-300 animate-pulse mb-4 text-lg font-mono">Loading Miren...</div>
          <div className="w-64 h-2 bg-gray-700 rounded-full mb-2">
            <div 
              className="h-2 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <div className="text-gray-400 text-sm font-mono">
            {Math.round(loadingProgress)}%
          </div>
        </div>
      )}
    </div>
  )
}