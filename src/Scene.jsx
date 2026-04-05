import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { sectionContent, sectionOrder } from './portfolioData'

extend({ OrbitControls })

function CameraControls({ enabled }) {
  const controlsRef = useRef(null)
  const { camera, gl } = useThree()

  useEffect(() => {
    if (!controlsRef.current) {
      return
    }

    controlsRef.current.target.set(0, 1.2, 0)
    controlsRef.current.update()
  }, [])

  useFrame(() => {
    controlsRef.current?.update()
  })

  return (
    <orbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enabled={enabled}
      enableDamping
      dampingFactor={0.08}
      enablePan={false}
      minDistance={8}
      maxDistance={18}
      maxPolarAngle={Math.PI / 2.15}
      minPolarAngle={Math.PI / 4.5}
      rotateSpeed={0.8}
      zoomSpeed={0.85}
    />
  )
}

function CameraDirector({ activeSection, enteringSection, buildingPositions }) {
  const { camera } = useThree()
  const focusTarget = useRef(new THREE.Vector3(0, 1.2, 0))
  const desiredCamera = useRef(new THREE.Vector3(0, 8, 13))

  useFrame(() => {
    if (!enteringSection) {
      return
    }

    const sectionKey = enteringSection || activeSection
    const targetPosition = buildingPositions[sectionKey] ?? [0, 0, 0]
    const [x, y, z] = targetPosition

    focusTarget.current.lerp(new THREE.Vector3(x, 1.45 + y, z), 0.08)
    desiredCamera.current.lerp(new THREE.Vector3(x * 0.5, 3.6, z + 4.8), 0.08)

    camera.position.lerp(desiredCamera.current, 0.08)
    camera.lookAt(focusTarget.current)
  })

  return null
}

function Ground({ theme }) {
  const isDark = theme === 'dark'

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[18, 64]} />
        <meshStandardMaterial color={isDark ? '#456f2b' : '#7ec850'} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <ringGeometry args={[18, 24, 64]} />
        <meshStandardMaterial color={isDark ? '#2d481d' : '#62a73d'} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[3.7, 4.6, 6]} />
        <meshStandardMaterial color={isDark ? '#8a6b3d' : '#d4b483'} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[6.3, 7.7, 6]} />
        <meshStandardMaterial color={isDark ? '#1f2f3f' : '#68b7d7'} />
      </mesh>
    </group>
  )
}

function Walls({ theme }) {
  const count = 18
  const radius = 5.4
  const wallPieces = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => {
        const angle = (index / count) * Math.PI * 2
        return {
          position: [Math.cos(angle) * radius, 0.45, Math.sin(angle) * radius],
          rotation: [0, -angle, 0],
        }
      }),
    [],
  )

  const stoneColor = theme === 'dark' ? '#5f554f' : '#8f8170'
  const goldColor = theme === 'dark' ? '#c79b38' : '#f3c25d'
  const accentColor = theme === 'dark' ? '#ff9e3d' : '#ffd979'

  return wallPieces.map((piece, index) => (
    <group key={index} position={piece.position} rotation={piece.rotation}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.9, 0.5]} />
        <meshStandardMaterial color={stoneColor} />
      </mesh>
      <mesh position={[0, 0.58, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.82, 0.18, 0.58]} />
        <meshStandardMaterial color={goldColor} metalness={0.3} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.72, 0]} castShadow>
        <boxGeometry args={[0.24, 0.14, 0.24]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.25} />
      </mesh>
    </group>
  ))
}

function DecorativeTrees({ theme }) {
  const trees = [
    [-8.5, 0, -5.5],
    [8.2, 0, -4.8],
    [-7.6, 0, 5.8],
    [7.1, 0, 6.3],
  ]

  return trees.map(([x, y, z], index) => (
    <group key={index} position={[x, y, z]}>
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 1.2, 8]} />
        <meshStandardMaterial color={theme === 'dark' ? '#624126' : '#7b4c2a'} />
      </mesh>
      <mesh position={[0, 1.7, 0]} castShadow>
        <coneGeometry args={[0.9, 1.9, 10]} />
        <meshStandardMaterial color={theme === 'dark' ? '#204e2a' : '#2b7f3c'} />
      </mesh>
    </group>
  ))
}

function Clouds({ theme }) {
  const clouds = [
    [-7.5, 7.2, -10],
    [0.5, 8, -11],
    [7.8, 6.7, -9.5],
  ]

  const cloudColor = theme === 'dark' ? '#c2d3e7' : '#f9fcff'

  return clouds.map(([x, y, z], index) => (
    <group key={index} position={[x, y, z]}>
      <mesh>
        <sphereGeometry args={[1, 18, 18]} />
        <meshStandardMaterial color={cloudColor} transparent opacity={theme === 'dark' ? 0.62 : 1} />
      </mesh>
      <mesh position={[0.9, 0.15, 0]}>
        <sphereGeometry args={[0.75, 18, 18]} />
        <meshStandardMaterial color={cloudColor} transparent opacity={theme === 'dark' ? 0.62 : 1} />
      </mesh>
      <mesh position={[-0.9, 0.1, 0]}>
        <sphereGeometry args={[0.7, 18, 18]} />
        <meshStandardMaterial color={cloudColor} transparent opacity={theme === 'dark' ? 0.62 : 1} />
      </mesh>
    </group>
  ))
}

function BuildingIcon({ section, theme }) {
  const iconColor = theme === 'dark' ? '#e7f6ff' : '#fff7de'
  const accent = theme === 'dark' ? '#78d6ff' : '#f0ac27'

  if (section === 'About') {
    return (
      <group position={[0, 2.65, 1.05]}>
        <mesh>
          <planeGeometry args={[0.9, 0.9]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.18} />
        </mesh>
        <mesh position={[0, 0.1, 0.02]}>
          <ringGeometry args={[0.16, 0.28, 24]} />
          <meshBasicMaterial color={iconColor} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -0.22, 0.02]}>
          <ringGeometry args={[0.2, 0.34, 3]} />
          <meshBasicMaterial color={iconColor} side={THREE.DoubleSide} rotation={[0, 0, Math.PI]} />
        </mesh>
      </group>
    )
  }

  if (section === 'Skills') {
    return (
      <group position={[0, 2.45, 1.02]}>
        <mesh>
          <boxGeometry args={[0.78, 0.78, 0.06]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.14} />
        </mesh>
        <mesh position={[0, 0.12, 0.05]}>
          <torusGeometry args={[0.18, 0.05, 10, 18]} />
          <meshBasicMaterial color={iconColor} />
        </mesh>
        <mesh position={[0, 0.12, 0.05]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.18, 0.05, 10, 18]} />
          <meshBasicMaterial color={iconColor} />
        </mesh>
      </group>
    )
  }

  if (section === 'Certificates') {
    return (
      <group position={[0, 2.5, 1.02]}>
        <mesh>
          <planeGeometry args={[0.92, 0.74]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.14} />
        </mesh>
        <mesh position={[0, 0.02, 0.04]}>
          <boxGeometry args={[0.34, 0.12, 0.05]} />
          <meshBasicMaterial color={iconColor} />
        </mesh>
        <mesh position={[-0.14, -0.2, 0.04]}>
          <cylinderGeometry args={[0.07, 0.07, 0.22, 18]} />
          <meshBasicMaterial color={iconColor} />
        </mesh>
        <mesh position={[0.14, -0.2, 0.04]}>
          <cylinderGeometry args={[0.07, 0.07, 0.22, 18]} />
          <meshBasicMaterial color={iconColor} />
        </mesh>
      </group>
    )
  }

  if (section === 'Projects') {
    return (
      <group position={[0, 2.55, 1.04]}>
        <mesh>
          <planeGeometry args={[0.92, 0.72]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.14} />
        </mesh>
        <mesh position={[0, 0.02, 0.04]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.26, 0.26, 0.06]} />
          <meshBasicMaterial color={iconColor} />
        </mesh>
        <mesh position={[0.19, 0.19, 0.04]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.18, 0.18, 0.06]} />
          <meshBasicMaterial color={iconColor} />
        </mesh>
      </group>
    )
  }

  if (section === 'Contact') {
    return (
      <group position={[0, 2.65, 1.02]}>
        <mesh>
          <planeGeometry args={[0.86, 0.76]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.14} />
        </mesh>
        <mesh position={[0, 0.04, 0.04]}>
          <boxGeometry args={[0.46, 0.28, 0.05]} />
          <meshBasicMaterial color={iconColor} />
        </mesh>
        <mesh position={[0, 0.15, 0.05]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.34, 0.05, 0.05]} />
          <meshBasicMaterial color={accent} />
        </mesh>
      </group>
    )
  }

  return (
    <group position={[0, 2.8, 0]}>
      <mesh>
        <sphereGeometry args={[0.34, 20, 20]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.28} />
      </mesh>
    </group>
  )
}

function Building({ section, position, color, roofColor, active, onEnter, theme, shape }) {
  const groupRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const glowColor = theme === 'dark' ? '#7fe4ff' : '#ffd465'
  const baseColor = theme === 'dark' ? '#65533d' : '#c49d58'

  const renderShape = () => {
    if (shape === 'castle') {
      return (
        <>
          <mesh castShadow receiveShadow position={[0, 0.95, 0]}>
            <boxGeometry args={[2.2, 1.8, 2]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh castShadow receiveShadow position={[-0.78, 1.55, 0]}>
            <cylinderGeometry args={[0.38, 0.42, 1.5, 8]} />
            <meshStandardMaterial color={roofColor} />
          </mesh>
          <mesh castShadow receiveShadow position={[0.78, 1.55, 0]}>
            <cylinderGeometry args={[0.38, 0.42, 1.5, 8]} />
            <meshStandardMaterial color={roofColor} />
          </mesh>
          <mesh castShadow receiveShadow position={[0, 2.2, 0]}>
            <coneGeometry args={[1.45, 1, 4]} />
            <meshStandardMaterial color={roofColor} />
          </mesh>
        </>
      )
    }

    if (shape === 'camp') {
      return (
        <>
          <mesh castShadow receiveShadow position={[0, 0.68, 0]}>
            <cylinderGeometry args={[1.35, 1.55, 1.25, 6]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh castShadow receiveShadow position={[0, 1.55, 0]}>
            <coneGeometry args={[1.52, 1.35, 6]} />
            <meshStandardMaterial color={roofColor} />
          </mesh>
          <mesh castShadow receiveShadow position={[0, 0.78, 0.96]}>
            <boxGeometry args={[0.52, 0.72, 0.12]} />
            <meshStandardMaterial color={theme === 'dark' ? '#43301c' : '#7d4d1f'} />
          </mesh>
        </>
      )
    }

    if (shape === 'lab') {
      return (
        <>
          <mesh castShadow receiveShadow position={[0, 0.72, 0]}>
            <cylinderGeometry args={[1.28, 1.42, 1.35, 18]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh castShadow receiveShadow position={[0, 1.78, 0]}>
            <sphereGeometry args={[1.1, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={roofColor} />
          </mesh>
          <mesh castShadow receiveShadow position={[0.92, 1.35, 0]}>
            <cylinderGeometry args={[0.18, 0.24, 1.2, 12]} />
            <meshStandardMaterial color={theme === 'dark' ? '#a9b5c3' : '#e4ebf4'} />
          </mesh>
        </>
      )
    }

    if (shape === 'workshop') {
      return (
        <>
          <mesh castShadow receiveShadow position={[0, 0.76, 0]}>
            <boxGeometry args={[2.1, 1.5, 1.9]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh castShadow receiveShadow position={[0, 1.75, 0]} rotation={[0, Math.PI / 4, 0]}>
            <octahedronGeometry args={[1.18]} />
            <meshStandardMaterial color={roofColor} />
          </mesh>
          <mesh castShadow receiveShadow position={[0.84, 1.2, 0]}>
            <boxGeometry args={[0.3, 0.8, 0.3]} />
            <meshStandardMaterial color={theme === 'dark' ? '#5b4a3d' : '#a47a44'} />
          </mesh>
        </>
      )
    }

    if (shape === 'tower') {
      return (
        <>
          <mesh castShadow receiveShadow position={[0, 1.05, 0]}>
            <cylinderGeometry args={[0.92, 1.18, 2.1, 8]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh castShadow receiveShadow position={[0, 2.55, 0]}>
            <coneGeometry args={[1.02, 1.05, 8]} />
            <meshStandardMaterial color={roofColor} />
          </mesh>
        </>
      )
    }

    return (
      <>
        <mesh castShadow receiveShadow position={[0, 0.8, 0]}>
          <boxGeometry args={[1.8, 1.6, 1.8]} />
          <meshStandardMaterial color={color} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 1.95, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[1.55, 1.2, 4]} />
          <meshStandardMaterial color={roofColor} />
        </mesh>
      </>
    )
  }

  useFrame((state) => {
    if (!groupRef.current) {
      return
    }

    const targetScale = hovered || active ? 1.08 : 1
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08)
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35 + position[0]) * 0.03
  })

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(event) => {
        event.stopPropagation()
        onEnter(section)
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh castShadow receiveShadow position={[0, 0.18, 0]}>
        <cylinderGeometry args={[2.05, 2.2, 0.3, 6]} />
        <meshStandardMaterial color={baseColor} />
      </mesh>
      {renderShape()}
      <mesh castShadow receiveShadow position={[0, 1.15, 0.95]}>
        <boxGeometry args={[0.46, 0.8, 0.12]} />
        <meshStandardMaterial color={theme === 'dark' ? '#43301c' : '#7d4d1f'} />
      </mesh>
      <mesh castShadow position={[0, 1.42, 0.97]}>
        <boxGeometry args={[0.64, 0.18, 0.08]} />
        <meshStandardMaterial color={theme === 'dark' ? '#ceb16a' : '#f4d06a'} />
      </mesh>
      {active ? (
        <mesh position={[0, 3.25, 0]}>
          <sphereGeometry args={[0.28, 16, 16]} />
          <meshStandardMaterial emissive={glowColor} color={glowColor} emissiveIntensity={1.2} />
        </mesh>
      ) : null}
      <BuildingIcon section={section} theme={theme} />
    </group>
  )
}

function Village({ activeSection, onEnter, enteringSection, theme }) {
  const isDark = theme === 'dark'
  const buildings = useMemo(
    () => [
      { section: 'Home', position: [0, 0, 0], color: '#d8b07c', roofColor: '#c4493a' },
      { section: 'About', position: [-4.6, 0, -3.1], color: '#d9c39a', roofColor: '#8f5b2e', shape: 'castle' },
      { section: 'Skills', position: [4.6, 0, -3.1], color: '#b9c58b', roofColor: '#587b39', shape: 'camp' },
      { section: 'Certificates', position: [-5.5, 0, 3.6], color: '#a3c8d8', roofColor: '#467c9d', shape: 'lab' },
      { section: 'Projects', position: [5.5, 0, 3.6], color: '#d1a3d8', roofColor: '#6b4584', shape: 'workshop' },
      { section: 'Contact', position: [0, 0, 5.8], color: '#d8b16a', roofColor: '#825f22', shape: 'tower' },
    ],
    [],
  )

  const buildingPositions = useMemo(
    () =>
      buildings.reduce((positions, building) => {
        positions[building.section] = building.position
        return positions
      }, {}),
    [buildings],
  )

  return (
    <>
      <color attach="background" args={[isDark ? '#0d1628' : '#8bd1ff']} />
      <fog attach="fog" args={[isDark ? '#0d1628' : '#8bd1ff', 14, 28]} />
      <ambientLight intensity={isDark ? 0.85 : 1.3} />
      <directionalLight
        castShadow
        intensity={isDark ? 1.15 : 2.2}
        position={[8, 12, 6]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      {isDark ? <pointLight position={[0, 5, 0]} intensity={12} distance={28} color="#78d6ff" /> : null}
      <Ground theme={theme} />
      <Walls theme={theme} />
      <DecorativeTrees theme={theme} />
      <Clouds theme={theme} />
      <CameraDirector
        activeSection={activeSection}
        enteringSection={enteringSection}
        buildingPositions={buildingPositions}
      />
      {buildings.map((building) => (
        <Building
          key={building.section}
          {...building}
          active={activeSection === building.section}
          onEnter={onEnter}
          theme={theme}
        />
      ))}
    </>
  )
}

export default function Scene({ activeSection, onEnter, enteringSection, theme, showLegend = true }) {
  return (
    <div className="scene-shell">
      <Canvas
        camera={{ position: [0, 8, 13], fov: 42 }}
        shadows
        gl={{ antialias: true }}
      >
        <CameraControls enabled={!enteringSection} />
        <Village
          activeSection={activeSection}
          onEnter={onEnter}
          enteringSection={enteringSection}
          theme={theme}
        />
      </Canvas>
      <div className="scene-hint">
        <p>Drag to rotate. Scroll to zoom. Click a building to go inside.</p>
        <span>{sectionContent[activeSection]?.label || sectionOrder[0]}</span>
      </div>
      {showLegend ? (
        <div className="building-legend">
          {sectionOrder.map((section) => (
            <button key={section} type="button" onClick={() => onEnter(section)}>
              {section}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
