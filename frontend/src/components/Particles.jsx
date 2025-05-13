import React, { useRef, useEffect, useState } from 'react'

export default function Component() {
  const canvasRef = useRef(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isTouchingRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)

  // AWS logo path directly included in the file
  const AWS_LOGO_PATH = "M86 66l2 9c0 3 1 5 3 8v2l-1 3-7 4-2 1-3-1-4-5-3-6c-8 9-18 14-29 14-9 0-16-3-20-8-5-4-8-11-8-19s3-15 9-20c6-6 14-8 25-8a79 79 0 0 1 22 3v-7c0-8-2-13-5-16-3-4-8-5-16-5l-11 1a80 80 0 0 0-14 5h-2c-1 0-2-1-2-3v-5l1-3c0-1 1-2 3-2l12-5 16-2c12 0 20 3 26 8 5 6 8 14 8 25v32zM46 82l10-2c4-1 7-4 10-7l3-6 1-9v-4a84 84 0 0 0-19-2c-6 0-11 1-15 4-3 2-4 6-4 11s1 8 3 11c3 2 6 4 11 4zm80 10-4-1-2-3-23-78-1-4 2-2h10l4 1 2 4 17 66 15-66 2-4 4-1h8l4 1 2 4 16 67 17-67 2-4 4-1h9c2 0 3 1 3 2v2l-1 2-24 78-2 4-4 1h-9l-4-1-1-4-16-65-15 64-2 4-4 1h-9zm129 3a66 66 0 0 1-27-6l-3-3-1-2v-5c0-2 1-3 2-3h2l3 1a54 54 0 0 0 23 5c6 0 11-2 14-4 4-2 5-5 5-9l-2-7-10-5-15-5c-7-2-13-6-16-10a24 24 0 0 1 5-34l10-5a44 44 0 0 1 20-2 110 110 0 0 1 12 3l4 2 3 2 1 4v4c0 3-1 4-2 4l-4-2c-6-2-12-3-19-3-6 0-11 0-14 2s-4 5-4 9c0 3 1 5 3 7s5 4 11 6l14 4c7 3 12 6 15 10s5 9 5 14l-3 12-7 8c-3 3-7 5-11 6l-14 2z M274 144A220 220 0 0 1 4 124c-4-3-1-6 2-4a300 300 0 0 0 263 16c5-2 10 4 5 8z M287 128c-4-5-28-3-38-1-4 0-4-3-1-5 19-13 50-9 53-5 4 5-1 36-18 51-3 2-6 1-5-2 5-10 13-33 9-38z"

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      setIsMobile(window.innerWidth < 768) // Set mobile breakpoint
    }

    updateCanvasSize()

    let particles = []

    let textImageData = null

    function createTextImage() {
      if (!ctx || !canvas) return 0

      ctx.fillStyle = 'white'
      ctx.save()
      
      const logoHeight = isMobile ? 60 : 120
      const vercelLogoWidth = logoHeight * (40 / 19.7762) // Maintain aspect ratio
      const awsLogoWidth = logoHeight * (283 / 140) // Maintain aspect ratio
      const logoSpacing = isMobile ? 30 : 60 // Increased gap for mobile and desktop
      const totalWidth = vercelLogoWidth + awsLogoWidth + logoSpacing
      
      ctx.translate(canvas.width / 2 - totalWidth / 2, canvas.height / 2 - logoHeight / 2)

      // Draw Vercel logo
      ctx.save()
      const vercelScale = logoHeight / 19.7762
      ctx.scale(vercelScale, vercelScale)
      ctx.beginPath()
      ctx.moveTo(23.3919, 0)
      ctx.lineTo(32.9188, 0)
      ctx.bezierCurveTo(36.7819, 0, 39.9136, 3.13165, 39.9136, 6.99475)
      ctx.lineTo(39.9136, 16.0805)
      ctx.lineTo(36.0006, 16.0805)
      ctx.lineTo(36.0006, 6.99475)
      ctx.bezierCurveTo(36.0006, 6.90167, 35.9969, 6.80925, 35.9898, 6.71766)
      ctx.lineTo(26.4628, 16.079)
      ctx.bezierCurveTo(26.4949, 16.08, 26.5272, 16.0805, 26.5595, 16.0805)
      ctx.lineTo(36.0006, 16.0805)
      ctx.lineTo(36.0006, 19.7762)
      ctx.lineTo(26.5595, 19.7762)
      ctx.bezierCurveTo(22.6964, 19.7762, 19.4788, 16.6139, 19.4788, 12.7508)
      ctx.lineTo(19.4788, 3.68923)
      ctx.lineTo(23.3919, 3.68923)
      ctx.lineTo(23.3919, 12.7508)
      ctx.bezierCurveTo(23.3919, 12.9253, 23.4054, 13.0977, 23.4316, 13.2668)
      ctx.lineTo(33.1682, 3.6995)
      ctx.bezierCurveTo(33.0861, 3.6927, 33.003, 3.68923, 32.9188, 3.68923)
      ctx.lineTo(23.3919, 3.68923)
      ctx.lineTo(23.3919, 0)
      ctx.closePath()

      ctx.moveTo(13.7688, 19.0956)
      ctx.lineTo(0, 3.68759)
      ctx.lineTo(5.53933, 3.68759)
      ctx.lineTo(13.6231, 12.7337)
      ctx.lineTo(13.6231, 3.68759)
      ctx.lineTo(17.7535, 3.68759)
      ctx.lineTo(17.7535, 17.5746)
      ctx.bezierCurveTo(17.7535, 19.6705, 15.1654, 20.6584, 13.7688, 19.0956)
      ctx.closePath()

      ctx.fill()
      ctx.restore()

      // Draw AWS logo
      ctx.save()
      ctx.translate(vercelLogoWidth + logoSpacing, 0)
      const awsScale = logoHeight / 140
      ctx.scale(awsScale, awsScale)
      const path = new Path2D(AWS_LOGO_PATH)
      ctx.fill(path)
      ctx.restore()

      ctx.restore()

      textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      return Math.max(vercelScale, awsScale)
    }

    function createParticle(scale) {
      if (!ctx || !canvas || !textImageData) return null

      const data = textImageData.data
      const particleGap = 2

      for (let attempt = 0; attempt < 100; attempt++) {
        const x = Math.floor(Math.random() * canvas.width)
        const y = Math.floor(Math.random() * canvas.height)

        if (data[(y * canvas.width + x) * 4 + 3] > 128) {
          const logoHeight = isMobile ? 60 : 120
          const vercelLogoWidth = logoHeight * (40 / 19.7762)
          const awsLogoWidth = logoHeight * (283 / 140)
          const logoSpacing = isMobile ? 30 : 60
          const totalWidth = vercelLogoWidth + awsLogoWidth + logoSpacing
          const centerX = canvas.width / 2
          const centerY = canvas.height / 2
          const isAWSLogo = x >= centerX + (totalWidth / 2) - awsLogoWidth
          return {
            x: x,
            y: y,
            baseX: x,
            baseY: y,
            size: Math.random() * 1 + 0.5,
            color: 'white', 
            scatteredColor: isAWSLogo ? '#FF9900' : '#00DCFF', 
            isAWS: isAWSLogo,
            life: Math.random() * 100 + 50
          }
        }
      }

      return null
    }

    function createInitialParticles(scale) {
      const baseParticleCount = 7000 // Increased base count for higher density
      const particleCount = Math.floor(baseParticleCount * Math.sqrt((canvas.width * canvas.height) / (1920 * 1080)))
      for (let i = 0; i < particleCount; i++) {
        const particle = createParticle(scale)
        if (particle) particles.push(particle)
      }
    }

    let animationFrameId

    function animate(scale) {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const { x: mouseX, y: mouseY } = mousePositionRef.current
      const maxDistance = 240

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance && (isTouchingRef.current || !('ontouchstart' in window))) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          const moveX = Math.cos(angle) * force * 60
          const moveY = Math.sin(angle) * force * 60
          p.x = p.baseX - moveX
          p.y = p.baseY - moveY
          
          ctx.fillStyle = p.scatteredColor
        } else {
          p.x += (p.baseX - p.x) * 0.1
          p.y += (p.baseY - p.y) * 0.1
          ctx.fillStyle = 'white' 
        }

        ctx.fillRect(p.x, p.y, p.size, p.size)

        p.life--
        if (p.life <= 0) {
          const newParticle = createParticle(scale)
          if (newParticle) {
            particles[i] = newParticle
          } else {
            particles.splice(i, 1)
            i--
          }
        }
      }

      const baseParticleCount = 7000
      const targetParticleCount = Math.floor(baseParticleCount * Math.sqrt((canvas.width * canvas.height) / (1920 * 1080)))
      while (particles.length < targetParticleCount) {
        const newParticle = createParticle(scale)
        if (newParticle) particles.push(newParticle)
      }

      animationFrameId = requestAnimationFrame(() => animate(scale))
    }

    const scale = createTextImage()
    createInitialParticles(scale)
    animate(scale)

    const handleResize = () => {
      updateCanvasSize()
      const newScale = createTextImage()
      particles = []
      createInitialParticles(newScale)
    }

    const handleMove = (x, y) => {
      mousePositionRef.current = { x, y }
    }

    const handleMouseMove = (e) => {
      handleMove(e.clientX, e.clientY)
    }

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        e.preventDefault()
        handleMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const handleTouchStart = () => {
      isTouchingRef.current = true
    }

    const handleTouchEnd = () => {
      isTouchingRef.current = false
      mousePositionRef.current = { x: 0, y: 0 }
    }

    const handleMouseLeave = () => {
      if (!('ontouchstart' in window)) {
        mousePositionRef.current = { x: 0, y: 0 }
      }
    }

    window.addEventListener('resize', handleResize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('touchstart', handleTouchStart)
    canvas.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchend', handleTouchEnd)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isMobile])

  return (
    <div className="relative w-full h-dvh flex flex-col items-center justify-center bg-black">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full absolute top-0 left-0 touch-none"
        aria-label="Interactive particle effect with Vercel and AWS logos"
      />
      <div className="absolute bottom-[100px] text-center z-10">
        <p className="font-mono text-gray-400 text-xs sm:text-base md:text-sm ">
          Join the{' '}
          
          <a 
            href="https://vercel.fyi/v0-reinvent"
            target="_blank"
            className="invite-link text-gray-300 hover:text-cyan-400 transition-colors duration-300"
          >
            v0 Happy Hour
          </a>{' '}
          <span>at</span>
          <span className="transition-colors duration-300">
            {' '}aws re:invent
          </span> <br /><a href="https://v0.dev/chat/RqstUbkUVcB?b=b_BoU5qmQ0ehp" className="text-gray-500 text-xs mt-2.5 inline-block" target="_blank">(fork this v0)</a>
        
          <style>{`
            a.invite-link:hover + span + span {
              color: #FF9900;
            }
          `}</style>
        </p>
      </div>
    </div>
  )
} 