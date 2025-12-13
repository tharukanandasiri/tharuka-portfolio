import React, { useState, useEffect, useRef, useId } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useMotionValue, 
  useMotionTemplate,
  useSpring,
  useInView,
  useAnimation,
  useTransform
} from 'framer-motion';
import { 
  Github, Linkedin, Mail, ChevronDown, ExternalLink, 
  Code2, Terminal, User, LogOut, 
  Plus, Trash2, Lock, Sparkles, Layers, Command,
  ArrowRight, BookOpen, Calendar, FileText, MapPin, Phone, Send,
  Award, Heart, Medal, Menu, X,
  Brain, Cloud, Database, Server, Wind, Flame, Box, Zap, FileCode, Monitor,
  Twitter, Globe, Copy, MousePointer2, Download
} from 'lucide-react';

// --- FIREBASE IMPORTS ---
import { initializeApp } from "firebase/app";
import { 
  getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged 
} from "firebase/auth";
import { 
  getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, orderBy 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmDBIWg3uGDT8M78NdpVm4jo6AQbVgnvA",
  authDomain: "tharuka-portfolio-6d102.firebaseapp.com",
  projectId: "tharuka-portfolio-6d102",
  storageBucket: "tharuka-portfolio-6d102.firebasestorage.app",
  messagingSenderId: "369678320202",
  appId: "1:369678320202:web:93368158ce7cc02f705cb3",
  measurementId: "G-H3CES3F979"
};

let auth, db;
try {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (e) {
  console.warn("Firebase not connected. Using static data.");
}

// --- DATA ---
const STATIC_PROFILE = {
  name: "Tharuka Nandasiri",
  role: "Software Engineer",
  tagline: "Architecting digital experiences that merge complexity with clarity.",
  email: "tharukanandasiri123@gmail.com",
  phone: "+94 76 740 5599",
  location: "Kandy, Sri Lanka",
  github: "https://github.com/tharukanandasiri",
  linkedin: "https://linkedin.com/in/tharuka-nandasiri",
  about: "I am a motivated BSc. (Hons) Software Engineering undergraduate at SLTC. My passion lies in bridging the gap between complex backend logic and intuitive frontend experiences. I specialize in Full Stack Development and AI integration.",
  education: [
    { title: "BSc. (Hons) Software Engineering", place: "Sri Lanka Technology Campus", year: "2022 - 2026", grade: "GPA: 3.00" },
    { title: "Diploma in Spoken English", place: "ICBT Kandy Campus", year: "2022" },
    { title: "G.C.E. Advanced Level", place: "St. Thomas' College, Matale", year: "2018 - 2020" },
  ],
  experience: [
    { role: "Asst. Webmaster", company: "IEEE Student Branch of SLTC", year: "2024 - 2025" },
  ]
};

const SKILLS = [
  { name: "React", icon: <Code2 size={28} />, color: "text-blue-400" },
  { name: "Next.js", icon: <Layers size={28} />, color: "text-white" },
  { name: "TypeScript", icon: <FileCode size={28} />, color: "text-blue-500" },
  { name: "Node.js", icon: <Server size={28} />, color: "text-green-500" },
  { name: "Python", icon: <Terminal size={28} />, color: "text-yellow-400" },
  { name: "AI/ML", icon: <Brain size={28} />, color: "text-purple-400" },
  { name: "Tailwind", icon: <Wind size={28} />, color: "text-cyan-400" },
  { name: "Framer Motion", icon: <Zap size={28} />, color: "text-pink-500" },
  { name: "Firebase", icon: <Flame size={28} />, color: "text-orange-500" },
  { name: "PostgreSQL", icon: <Database size={28} />, color: "text-blue-300" },
  { name: "Docker", icon: <Box size={28} />, color: "text-blue-600" },
  { name: "AWS", icon: <Cloud size={28} />, color: "text-yellow-600" }
];

const STATIC_VOLUNTEERING = [
  { role: "Content Creation Team Head", event: "Sri Lanka Arduino Challenge 2025", org: "SLTC IEEE" },
  { role: "Design Team Deputy Head", event: "IEEE GISLA 2024", org: "SLTC IEEE" },
  { role: "Design Team Member", event: "IEEE SPARK VI", org: "SLTC IEEE" },
  { role: "Content Team Deputy Head", event: "Codemania v4.0", org: "SLTC IEEE CS" },
  { role: "Content Team Member", event: "Career Fest 2023", org: "SLTC" },
  { role: "Design Team Member", event: "IdeaniX Generation 01", org: "SLTC IEEE CS" }
];

const STATIC_CERTIFICATIONS = [
  { title: "Fundamentals of Quality Assurance", issuer: "Alison" },
  { title: "How to create a Jira SCRUM project", issuer: "Coursera" },
  { title: "C for Beginners", issuer: "Great Learning" },
  { title: "Web Design for Beginners", issuer: "University of Moratuwa" },
  { title: "Bridging Program for IT Disciplines", issuer: "SLTC" },
  { title: "Python Programming", issuer: "SITEC Education" }
];

const STATIC_PROJECTS = [
  {
    id: 1,
    title: "AI-Driven NPCs Through Prompt Engineering",
    category: "AI / Game Dev",
    tech: ["TypeScript", "React", "Gemini API"],
    desc: "A thesis project revolutionizing gaming experiences using advanced prompt engineering for dynamic, non-scripted NPC behaviors.",
    link: "https://github.com/tharukanandasiri/dnd-be"
  },
  {
    id: 2,
    title: "AI-Powered Career Guidance System",
    category: "Machine Learning",
    tech: ["Next.js", "Python", "Scikit-learn"],
    desc: "Intelligent system identifying suitable tech roles based on personality traits and skills using predictive modeling.",
    link: "https://github.com/tharukanandasiri/AI-career-guidance-system"
  },
  {
    id: 3,
    title: "Smart Fan Control Using Image Processing",
    category: "IoT / Vision",
    tech: ["OpenCV", "Python", "Arduino"],
    desc: "Touchless hardware interface interpreting hand gestures for real-time environmental control.",
    link: "https://github.com/tharukanandasiri/smart_fan_control"
  },
  {
    id: 4,
    title: "Hotel Reservation System",
    category: "Full Stack",
    tech: ["PHP", "SQL", "JavaScript"],
    desc: "High-performance reservation system with complex validation logic and seamless server-side processing.",
    link: "https://github.com/tharukanandasiri/Hotel_reservation_system"
  }
];

const STATIC_ARTICLES = [
  {
    id: 1,
    title: "Understanding React Server Components",
    summary: "A deep dive into how RSCs are changing the landscape of frontend development and improving performance.",
    date: "2024-03-15",
    link: "#"
  },
  {
    id: 2,
    title: "The Future of AI in Software Testing",
    summary: "Exploring how LLMs and automated agents are revolutionizing QA processes and regression testing.",
    date: "2024-02-10",
    link: "#"
  }
];

// --- COMPONENTS ---

// 1. Fluid Cursor
const FluidCursor = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let config = {
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 512,
      CAPTURE_RESOLUTION: 512,
      DENSITY_DISSIPATION: 3.5,
      VELOCITY_DISSIPATION: 2,
      PRESSURE: 0.1,
      PRESSURE_ITERATIONS: 20,
      CURL: 3,
      SPLAT_RADIUS: 0.2,
      SPLAT_FORCE: 6000,
      SHADING: true,
      COLOR_UPDATE_SPEED: 10,
      PAUSED: false,
      BACK_COLOR: { r: 0, g: 0, b: 0 },
      TRANSPARENT: true,
    };

    function pointerPrototype() {
      return {
        id: -1,
        texcoordX: 0,
        texcoordY: 0,
        prevTexcoordX: 0,
        prevTexcoordY: 0,
        deltaX: 0,
        deltaY: 0,
        down: false,
        moved: false,
        color: { r: 0, g: 0, b: 0 },
      };
    }

    let pointers = [pointerPrototype()];
    let splatStack = [];
    const { gl, ext } = getWebGLContext(canvas);

    if (!gl || !ext) return;

    function getWebGLContext(canvas) {
      const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
      let gl = canvas.getContext('webgl2', params);
      const isWebGL2 = !!gl;
      if (!isWebGL2) gl = canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params);

      let halfFloat;
      let supportLinearFiltering;
      if (isWebGL2) {
        gl.getExtension('EXT_color_buffer_float');
        supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
      } else {
        halfFloat = gl.getExtension('OES_texture_half_float');
        supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
      }

      gl.clearColor(0.0, 0.0, 0.0, 1.0);

      const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat.HALF_FLOAT_OES;
      let formatRGBA;
      let formatRG;
      let formatR;

      if (isWebGL2) {
        formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
      } else {
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      }

      return {
        gl,
        ext: {
          formatRGBA,
          formatRG,
          formatR,
          halfFloatTexType,
          supportLinearFiltering
        }
      };
    }

    function getSupportedFormat(gl, internalFormat, format, type) {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        switch (internalFormat) {
          case gl.R16F:
            return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
          case gl.RG16F:
            return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
          default:
            return null;
        }
      }
      return { internalFormat, format };
    }

    function supportRenderTextureFormat(gl, internalFormat, format, type) {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      return status === gl.FRAMEBUFFER_COMPLETE;
    }

    function compileShader(type, source, keywords) {
      source = addKeywords(source, keywords);
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.trace(gl.getShaderInfoLog(shader));
      }
      return shader;
    }

    function addKeywords(source, keywords) {
      if (!keywords) return source;
      let keywordsString = '';
      keywords.forEach(keyword => {
        keywordsString += '#define ' + keyword + '\n';
      });
      return keywordsString + source;
    }

    const baseVertexShader = compileShader(gl.VERTEX_SHADER, `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 texelSize;
      void main () {
          vUv = aPosition * 0.5 + 0.5;
          vL = vUv - vec2(texelSize.x, 0.0);
          vR = vUv + vec2(texelSize.x, 0.0);
          vT = vUv + vec2(0.0, texelSize.y);
          vB = vUv - vec2(0.0, texelSize.y);
          gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `);

    const copyShader = compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      uniform sampler2D uTexture;
      void main () {
          gl_FragColor = texture2D(uTexture, vUv);
      }
    `);

    const clearShader = compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      uniform sampler2D uTexture;
      uniform float value;
      void main () {
          gl_FragColor = value * texture2D(uTexture, vUv);
      }
    `);

    const displayShaderSource = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform sampler2D uDithering;
      uniform vec2 ditherScale;
      uniform vec2 texelSize;
      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          #ifdef SHADING
              vec3 lc = texture2D(uTexture, vL).rgb;
              vec3 rc = texture2D(uTexture, vR).rgb;
              vec3 tc = texture2D(uTexture, vT).rgb;
              vec3 bc = texture2D(uTexture, vB).rgb;
              float dx = length(rc) - length(lc);
              float dy = length(tc) - length(bc);
              vec3 n = normalize(vec3(dx, dy, length(texelSize)));
              vec3 l = vec3(0.0, 0.0, 1.0);
              float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
              c *= diffuse;
          #endif
          float a = max(c.r, max(c.g, c.b));
          gl_FragColor = vec4(c, a);
      }
    `;

    const splatShader = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;
      void main () {
          vec2 p = vUv - point.xy;
          p.x *= aspectRatio;
          vec3 splat = exp(-dot(p, p) / radius) * color;
          vec3 base = texture2D(uTarget, vUv).xyz;
          gl_FragColor = vec4(base + splat, 1.0);
      }
    `);

    const advectionShader = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform vec2 dyeTexelSize;
      uniform float dt;
      uniform float dissipation;
      vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
          vec2 st = uv / tsize - 0.5;
          vec2 iuv = floor(st);
          vec2 fuv = fract(st);
          vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
          vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
          vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
          vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
          return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
      }
      void main () {
          #ifdef MANUAL_FILTERING
              vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
              vec4 result = bilerp(uSource, coord, dyeTexelSize);
          #else
              vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
              vec4 result = texture2D(uSource, coord);
          #endif
          float decay = 1.0 + dissipation * dt;
          gl_FragColor = result / decay;
      }
    `, ext.supportLinearFiltering ? null : ['MANUAL_FILTERING']);

    const divergenceShader = compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;
      void main () {
          float L = texture2D(uVelocity, vL).x;
          float R = texture2D(uVelocity, vR).x;
          float T = texture2D(uVelocity, vT).y;
          float B = texture2D(uVelocity, vB).y;
          vec2 C = texture2D(uVelocity, vUv).xy;
          if (vL.x < 0.0) { L = -C.x; }
          if (vR.x > 1.0) { R = -C.x; }
          if (vT.y > 1.0) { T = -C.y; }
          if (vB.y < 0.0) { B = -C.y; }
          float div = 0.5 * (R - L + T - B);
          gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `);

    const curlShader = compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;
      void main () {
          float L = texture2D(uVelocity, vL).y;
          float R = texture2D(uVelocity, vR).y;
          float T = texture2D(uVelocity, vT).x;
          float B = texture2D(uVelocity, vB).x;
          float vorticity = R - L - T + B;
          gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
      }
    `);

    const vorticityShader = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;
      uniform sampler2D uCurl;
      uniform float curl;
      uniform float dt;
      void main () {
          float L = texture2D(uCurl, vL).x;
          float R = texture2D(uCurl, vR).x;
          float T = texture2D(uCurl, vT).x;
          float B = texture2D(uCurl, vB).x;
          float C = texture2D(uCurl, vUv).x;
          vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
          force /= length(force) + 0.0001;
          force *= curl * C;
          force.y *= -1.0;
          vec2 velocity = texture2D(uVelocity, vUv).xy;
          velocity += force * dt;
          velocity = min(max(velocity, -1000.0), 1000.0);
          gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `);

    const pressureShader = compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;
      void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          float C = texture2D(uPressure, vUv).x;
          float divergence = texture2D(uDivergence, vUv).x;
          float pressure = (L + R + B + T - divergence) * 0.25;
          gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
    `);

    const gradientSubtractShader = compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;
      void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          vec2 velocity = texture2D(uVelocity, vUv).xy;
          velocity.xy -= vec2(R - L, T - B);
          gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `);

    function createProgram(vertexShader, fragmentShader) {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.trace(gl.getProgramInfoLog(program));
      }
      return program;
    }

    function getUniforms(program) {
      let uniforms = [];
      let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < uniformCount; i++) {
        let uniformName = gl.getActiveUniform(program, i).name;
        uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
      }
      return uniforms;
    }

    const material = {
        vertexShader: baseVertexShader,
        fragmentShaderSource: displayShaderSource,
        programs: [],
        activeProgram: null,
        uniforms: [],
        setKeywords(keywords) {
            let hash = 0;
            for (let i = 0; i < keywords.length; i++)
                hash += hashCode(keywords[i]);
            let program = this.programs[hash];
            if (program == null) {
                let fragmentShader = compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
                program = createProgram(this.vertexShader, fragmentShader);
                this.programs[hash] = program;
            }
            if (program == this.activeProgram) return;
            this.uniforms = getUniforms(program);
            this.activeProgram = program;
        },
        bind() {
            gl.useProgram(this.activeProgram);
        }
    };

    function hashCode(s) {
        if (s.length == 0) return 0;
        let hash = 0;
        for (let i = 0; i < s.length; i++) {
            hash = (hash << 5) - hash + s.charCodeAt(i);
            hash |= 0;
        }
        return hash;
    }

    function createProgramObject(vertexShader, fragmentShader) {
        let program = createProgram(vertexShader, fragmentShader);
        let uniforms = getUniforms(program);
        return {
            program: program,
            uniforms: uniforms,
            bind: function () {
                gl.useProgram(this.program);
            }
        };
    }

    const copyProgram = createProgramObject(baseVertexShader, copyShader);
    const clearProgram = createProgramObject(baseVertexShader, clearShader);
    const splatProgramObj = createProgramObject(baseVertexShader, splatShader);
    const advectionProgramObj = createProgramObject(baseVertexShader, advectionShader);
    const divergenceProgramObj = createProgramObject(baseVertexShader, divergenceShader);
    const curlProgramObj = createProgramObject(baseVertexShader, curlShader);
    const vorticityProgramObj = createProgramObject(baseVertexShader, vorticityShader);
    const pressureProgramObj = createProgramObject(baseVertexShader, pressureShader);
    const gradienSubtractProgramObj = createProgramObject(baseVertexShader, gradientSubtractShader);

    let dye;
    let velocity;
    let divergence;
    let curl;
    let pressure;

    function initFramebuffers() {
        let simRes = getResolution(config.SIM_RESOLUTION);
        let dyeRes = getResolution(config.DYE_RESOLUTION);

        const texType = ext.halfFloatTexType;
        const rgba = ext.formatRGBA;
        const rg = ext.formatRG;
        const r = ext.formatR;
        const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

        gl.disable(gl.BLEND);

        if (dye == null) dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
        else dye = resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);

        if (velocity == null) velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
        else velocity = resizeDoubleFBO(velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);

        divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
        curl = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
        pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    }

    function createFBO(w, h, internalFormat, format, type, param) {
        gl.activeTexture(gl.TEXTURE0);
        let texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

        let fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        gl.viewport(0, 0, w, h);
        gl.clear(gl.COLOR_BUFFER_BIT);

        return {
            texture,
            fbo,
            width: w,
            height: h,
            attach(id) {
                gl.activeTexture(gl.TEXTURE0 + id);
                gl.bindTexture(gl.TEXTURE_2D, texture);
                return id;
            }
        };
    }

    function createDoubleFBO(w, h, internalFormat, format, type, param) {
        let fbo1 = createFBO(w, h, internalFormat, format, type, param);
        let fbo2 = createFBO(w, h, internalFormat, format, type, param);

        return {
            width: w,
            height: h,
            texelSizeX: 1.0 / w,
            texelSizeY: 1.0 / h,
            get read() {
                return fbo1;
            },
            set read(value) {
                fbo1 = value;
            },
            get write() {
                return fbo2;
            },
            set write(value) {
                fbo2 = value;
            },
            swap() {
                let temp = fbo1;
                fbo1 = fbo2;
                fbo2 = temp;
            }
        };
    }

    function resizeFBO(target, w, h, internalFormat, format, type, param) {
        let newFBO = createFBO(w, h, internalFormat, format, type, param);
        copyProgram.bind();
        gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
        blit(newFBO);
        return newFBO;
    }

    function resizeDoubleFBO(target, w, h, internalFormat, format, type, param) {
        if (target.width == w && target.height == h)
            return target;
        target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param);
        target.write = createFBO(w, h, internalFormat, format, type, param);
        target.width = w;
        target.height = h;
        target.texelSizeX = 1.0 / w;
        target.texelSizeY = 1.0 / h;
        return target;
    }

    function getResolution(resolution) {
        let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
        if (aspectRatio < 1)
            aspectRatio = 1.0 / aspectRatio;

        let min = Math.round(resolution);
        let max = Math.round(resolution * aspectRatio);

        if (gl.drawingBufferWidth > gl.drawingBufferHeight)
            return { width: max, height: min };
        else
            return { width: min, height: max };
    }

    function blit(target) {
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);

        if (target == null) {
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        } else {
            gl.viewport(0, 0, target.width, target.height);
            gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        }
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }

    function updateKeywords() {
        let displayKeywords = [];
        if (config.SHADING) displayKeywords.push("SHADING");
        material.setKeywords(displayKeywords);
    }

    updateKeywords();
    initFramebuffers();
    let lastUpdateTime = Date.now();
    let colorUpdateTimer = 0.0;

    function update() {
        const dt = calcDeltaTime();
        if (resizeCanvas())
            initFramebuffers();
        updateColors(dt);
        applyInputs();
        step(dt);
        render(null);
        requestAnimationFrame(update);
    }

    function calcDeltaTime() {
        let now = Date.now();
        let dt = (now - lastUpdateTime) / 1000;
        dt = Math.min(dt, 0.016666);
        lastUpdateTime = now;
        return dt;
    }

    function resizeCanvas() {
        let width = scaleByPixelRatio(canvas.clientWidth);
        let height = scaleByPixelRatio(canvas.clientHeight);
        if (canvas.width != width || canvas.height != height) {
            canvas.width = width;
            canvas.height = height;
            return true;
        }
        return false;
    }

    function updateColors(dt) {
        colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
        if (colorUpdateTimer >= 1) {
            colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);
            pointers.forEach(p => {
                p.color = generateColor();
            });
        }
    }

    function applyInputs() {
        if (splatStack.length > 0)
            multipleSplats(splatStack.pop());

        pointers.forEach(p => {
            if (p.moved) {
                p.moved = false;
                splatPointer(p);
            }
        });
    }

    function step(dt) {
        gl.disable(gl.BLEND);

        curlProgramObj.bind();
        gl.uniform2f(curlProgramObj.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        gl.uniform1i(curlProgramObj.uniforms.uVelocity, velocity.read.attach(0));
        blit(curl);

        vorticityProgramObj.bind();
        gl.uniform2f(vorticityProgramObj.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        gl.uniform1i(vorticityProgramObj.uniforms.uVelocity, velocity.read.attach(0));
        gl.uniform1i(vorticityProgramObj.uniforms.uCurl, curl.attach(1));
        gl.uniform1f(vorticityProgramObj.uniforms.curl, config.CURL);
        gl.uniform1f(vorticityProgramObj.uniforms.dt, dt);
        blit(velocity.write);
        velocity.swap();

        divergenceProgramObj.bind();
        gl.uniform2f(divergenceProgramObj.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        gl.uniform1i(divergenceProgramObj.uniforms.uVelocity, velocity.read.attach(0));
        blit(divergence);

        clearProgram.bind();
        gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
        gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
        blit(pressure.write);
        pressure.swap();

        pressureProgramObj.bind();
        gl.uniform2f(pressureProgramObj.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        gl.uniform1i(pressureProgramObj.uniforms.uDivergence, divergence.attach(0));
        for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
            gl.uniform1i(pressureProgramObj.uniforms.uPressure, pressure.read.attach(1));
            blit(pressure.write);
            pressure.swap();
        }

        gradienSubtractProgramObj.bind();
        gl.uniform2f(gradienSubtractProgramObj.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        gl.uniform1i(gradienSubtractProgramObj.uniforms.uPressure, pressure.read.attach(0));
        gl.uniform1i(gradienSubtractProgramObj.uniforms.uVelocity, velocity.read.attach(1));
        blit(velocity.write);
        velocity.swap();

        advectionProgramObj.bind();
        gl.uniform2f(advectionProgramObj.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        if (!ext.supportLinearFiltering)
            gl.uniform2f(advectionProgramObj.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
        let velocityId = velocity.read.attach(0);
        gl.uniform1i(advectionProgramObj.uniforms.uVelocity, velocityId);
        gl.uniform1i(advectionProgramObj.uniforms.uSource, velocityId);
        gl.uniform1f(advectionProgramObj.uniforms.dt, dt);
        gl.uniform1f(advectionProgramObj.uniforms.dissipation, config.VELOCITY_DISSIPATION);
        blit(velocity.write);
        velocity.swap();

        if (!ext.supportLinearFiltering)
            gl.uniform2f(advectionProgramObj.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
        gl.uniform1i(advectionProgramObj.uniforms.uVelocity, velocity.read.attach(0));
        gl.uniform1i(advectionProgramObj.uniforms.uSource, dye.read.attach(1));
        gl.uniform1f(advectionProgramObj.uniforms.dissipation, config.DENSITY_DISSIPATION);
        blit(dye.write);
        dye.swap();
    }

    function render(target) {
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);
        drawDisplay(target);
    }

    function drawDisplay(target) {
        let width = target == null ? gl.drawingBufferWidth : target.width;
        let height = target == null ? gl.drawingBufferHeight : target.height;

        material.bind();
        if (config.SHADING)
            gl.uniform2f(material.uniforms.texelSize, 1.0 / width, 1.0 / height);
        gl.uniform1i(material.uniforms.uTexture, dye.read.attach(0));
        blit(target);
    }

    function splatPointer(pointer) {
        let dx = pointer.deltaX * config.SPLAT_FORCE;
        let dy = pointer.deltaY * config.SPLAT_FORCE;
        splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
    }

    function multipleSplats(amount) {
        for (let i = 0; i < amount; i++) {
            const color = generateColor();
            color.r *= 10.0;
            color.g *= 10.0;
            color.b *= 10.0;
            const x = Math.random();
            const y = Math.random();
            const dx = 1000 * (Math.random() - 0.5);
            const dy = 1000 * (Math.random() - 0.5);
            splat(x, y, dx, dy, color);
        }
    }

    function splat(x, y, dx, dy, color) {
        splatProgramObj.bind();
        gl.uniform1i(splatProgramObj.uniforms.uTarget, velocity.read.attach(0));
        gl.uniform1f(splatProgramObj.uniforms.aspectRatio, canvas.width / canvas.height);
        gl.uniform2f(splatProgramObj.uniforms.point, x, y);
        gl.uniform3f(splatProgramObj.uniforms.color, dx, dy, 0.0);
        gl.uniform1f(splatProgramObj.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0));
        blit(velocity.write);
        velocity.swap();

        gl.uniform1i(splatProgramObj.uniforms.uTarget, dye.read.attach(0));
        gl.uniform3f(splatProgramObj.uniforms.color, color.r, color.g, color.b);
        blit(dye.write);
        dye.swap();
    }

    function correctRadius(radius) {
        let aspectRatio = canvas.width / canvas.height;
        if (aspectRatio > 1)
            radius *= aspectRatio;
        return radius;
    }

    function updatePointerDownData(pointer, id, posX, posY) {
        pointer.id = id;
        pointer.down = true;
        pointer.moved = false;
        pointer.texcoordX = posX / canvas.width;
        pointer.texcoordY = 1.0 - posY / canvas.height;
        pointer.prevTexcoordX = pointer.texcoordX;
        pointer.prevTexcoordY = pointer.texcoordY;
        pointer.deltaX = 0;
        pointer.deltaY = 0;
        pointer.color = generateColor();
    }

    function updatePointerMoveData(pointer, posX, posY) {
        pointer.prevTexcoordX = pointer.texcoordX;
        pointer.prevTexcoordY = pointer.texcoordY;
        pointer.texcoordX = posX / canvas.width;
        pointer.texcoordY = 1.0 - posY / canvas.height;
        pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
        pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
        pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
    }

    function updatePointerUpData(pointer) {
        pointer.down = false;
    }

    function correctDeltaX(delta) {
        let aspectRatio = canvas.width / canvas.height;
        if (aspectRatio < 1) delta *= aspectRatio;
        return delta;
    }

    function correctDeltaY(delta) {
        let aspectRatio = canvas.width / canvas.height;
        if (aspectRatio > 1) delta /= aspectRatio;
        return delta;
    }

    function generateColor() {
        let c = HSVtoRGB(Math.random() * 0.4 + 0.4, 1.0, 1.0);
        c.r *= 0.15;
        c.g *= 0.15;
        c.b *= 0.15;
        return c;
    }

    function HSVtoRGB(h, s, v) {
        let r, g, b, i, f, p, q, t;
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }
        return { r, g, b };
    }

    function wrap(value, min, max) {
        let range = max - min;
        if (range == 0) return min;
        return (value - min) % range + min;
    }

    function scaleByPixelRatio(input) {
        let pixelRatio = window.devicePixelRatio || 1;
        return Math.floor(input * pixelRatio);
    }

    function onMouseMove(e) {
        let pointer = pointers[0];
        let posX = scaleByPixelRatio(e.clientX);
        let posY = scaleByPixelRatio(e.clientY);
        updatePointerMoveData(pointer, posX, posY);
    }

    function onMouseDown(e) {
        let pointer = pointers[0];
        let posX = scaleByPixelRatio(e.clientX);
        let posY = scaleByPixelRatio(e.clientY);
        updatePointerDownData(pointer, -1, posX, posY);
        let color = generateColor();
        color.r *= 5.0; color.g *= 5.0; color.b *= 5.0;
        splat(pointer.texcoordX, pointer.texcoordY, Math.random()*200-100, Math.random()*200-100, color);
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);

    update();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-50 h-full w-full">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
};

// --- SPARKLES COMPONENT (Restored) ---
const SparklesCore = ({
  id,
  className,
  background,
  minSize,
  maxSize,
  particleDensity,
  particleColor,
}) => {
  const [init, setInit] = useState(false);
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = canvas.parentElement.clientWidth;
    let height = canvas.parentElement.clientHeight;
    let particles = [];
    let animationId;

    const resize = () => {
      if (canvas.parentElement) {
        width = canvas.parentElement.clientWidth;
        height = canvas.parentElement.clientHeight;
        canvas.width = width;
        canvas.height = height;
        initParticles();
      }
    };

    const initParticles = () => {
      particles = [];
      const particleCount = particleDensity || 100;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * (maxSize || 2 - (minSize || 0.5)) + (minSize || 0.5),
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random(),
          opacitySpeed: Math.random() * 0.02 + 0.005,
          opacityDir: 1
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = background || "transparent";
      ctx.fillRect(0, 0, width, height);
      
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        if (p.opacity >= 1) p.opacityDir = -1;
        if (p.opacity <= 0.1) p.opacityDir = 1;
        p.opacity += p.opacitySpeed * p.opacityDir;
        p.opacity = Math.max(0, Math.min(1, p.opacity));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particleColor || "#FFFFFF"}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [minSize, maxSize, particleDensity, particleColor, background]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
};

// --- ANIMATION COMPONENTS ---

const RevealOnScroll = ({ children, delay = 0, width = "100%" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 50, filter: "blur(5px)" }}
      transition={{ duration: 0.8, delay, type: "spring", bounce: 0.4 }}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
};

const ScrambleText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 30);
    
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={className}>
      {displayText}
    </span>
  );
};

const MagneticButton = ({ children, className = "" }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.3); // Adjust strength
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${className}`}
    >
      {children}
    </motion.button>
  );
};

function Spotlight({ mouseX, mouseY }) {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: useMotionTemplate`
          radial-gradient(
            650px circle at ${mouseX}px ${mouseY}px,
            rgba(14, 165, 233, 0.10),
            transparent 80%
          )
        `,
      }}
    />
  );
}

// --- RUBBER BAND COMPONENT (Missing but used) ---
const RubberBandText = ({ text, className }) => {
  const controls = useAnimation();
  
  return (
    <motion.div 
      className={`flex flex-wrap justify-center ${className}`}
      onHoverStart={() => controls.start("hover")}
      onHoverEnd={() => controls.start("idle")}
    >
      {text.split("").map((letter, i) => (
        <motion.span
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20, 
            delay: i * 0.05 
          }}
          whileHover={{ 
            scale: [1, 1.4, 0.8, 1.2, 0.9, 1],
            color: "#60A5FA",
            transition: { duration: 0.6 }
          }}
          className="inline-block cursor-pointer hover:text-blue-400 transition-colors"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// --- NAVBAR ---

const Navbar = ({ setView, user }) => {
  const [active, setActive] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = ['Home', 'About', 'Projects', 'Volunteering', 'Articles', 'Contact'];

  const scrollToSection = (item) => {
    setActive(item);
    setMobileMenuOpen(false);
    if (item === 'Home') {
      setView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
      >
        <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 shadow-2xl flex items-center gap-2 md:gap-8">
          <div 
            className="flex items-center gap-2 cursor-pointer pr-4 border-r border-white/10"
            onClick={() => scrollToSection('Home')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-400 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-bold font-mono text-sm">TN</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  active === item ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {active === item && (
                  <motion.div 
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            {user ? (
               <button onClick={() => setView('admin')} className="text-emerald-400 p-2 hover:bg-white/5 rounded-full transition-colors">
                 <User size={18} />
               </button>
            ) : (
              <button onClick={() => setView('login')} className="text-slate-400 hover:text-white p-2 hover:bg-white/5 rounded-full transition-colors">
                 <Lock size={18} />
              </button>
            )}
            
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-4 right-4 z-40 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`p-3 rounded-xl text-left font-medium ${
                    active === item ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- SECTIONS ---

const Hero = () => {
  return (
    <section className="min-h-screen w-full bg-black flex flex-col justify-center pt-32 pb-20 overflow-hidden relative">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      
      <div className="relative z-20 flex flex-col items-center w-full px-4">
        {/* Name with Dynamic Letter Animation */}
        <div className="md:text-7xl text-5xl lg:text-9xl font-bold text-center text-white relative z-20 mb-2 tracking-tight flex flex-wrap justify-center gap-4">
          <RubberBandText text="Tharuka" className="block" />
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
             <RubberBandText text="Nandasiri" />
          </div>
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl md:text-2xl text-emerald-400 font-mono mb-8 relative z-20"
        >
          Software Engineering Undergraduate
        </motion.div>
        
        {/* Underline Effect */}
        <div className="w-full max-w-4xl h-12 relative mt-1 hidden md:block">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
        </div>

        <p className="text-lg text-slate-400 max-w-xl leading-relaxed text-center relative z-20 mt-6 md:mt-2">
             {STATIC_PROFILE.tagline}
        </p>

        <div className="flex gap-4 mt-8 relative z-20">
             <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-slate-200 transition-all flex items-center gap-2 group"
              >
                View Work
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href={STATIC_PROFILE.github} 
                target="_blank"
                className="px-8 py-3 bg-slate-900 text-white border border-slate-800 rounded-full font-medium hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                <Github size={18} />
                GitHub
              </a>
              <a 
                href="/tharukanandasiri_cv.pdf"
                download
                className="px-8 py-3 bg-slate-900 text-white border border-slate-800 rounded-full font-medium hover:bg-emerald-600/20 hover:border-emerald-500/50 transition-all flex items-center gap-2"
              >
                <Download size={18} />
                Download CV
              </a>
        </div>

        {/* --- ADDED STATS & SCROLL INDICATOR --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center relative z-20"
        >
           <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">3+</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest mt-1">Years Coding</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">10+</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest mt-1">Projects</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">100+</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest mt-1">Commits</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">3</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest mt-1">Hackathons</span>
           </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-600 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <MousePointer2 size={20} />
        </motion.div>
      </div>
    </section>
  );
};

const SkillsGrid = () => {
  return (
    <div className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <RevealOnScroll>
          <h2 className="text-2xl font-bold text-white mb-16">Technical Arsenal</h2>
        </RevealOnScroll>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-12 max-w-5xl mx-auto">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}
              whileHover={{ 
                y: -10, 
                scale: 1.2,
              }}
              className="flex flex-col items-center gap-4 group cursor-pointer"
            >
              {/* No Outer Box, just icon */}
              <div className={`transition-all duration-300 transform group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] ${skill.color}`}>
                {skill.icon}
              </div>
              <span className="text-xs text-slate-500 font-mono group-hover:text-white transition-colors tracking-widest uppercase">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-black relative">
       <div className="max-w-6xl mx-auto px-6">
         <div className="grid md:grid-cols-2 gap-16 items-center">
            <RevealOnScroll>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-30 blur-lg group-hover:opacity-50 transition duration-500"></div>
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                  <img 
                    src="/profile.png" 
                    alt="Tharuka Nandasiri"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale hover:grayscale-0"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                     <h3 className="text-white font-bold text-xl">Tharuka Nandasiri</h3>
                     <p className="text-blue-400 text-sm">Undergraduate SE</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            <div>
               <RevealOnScroll delay={0.2}>
                 <h2 className="text-4xl font-bold text-white mb-6">About Me</h2>
                 <p className="text-slate-400 text-lg leading-relaxed mb-8">
                   {STATIC_PROFILE.about}
                 </p>
               </RevealOnScroll>

               <div className="space-y-8">
                  <RevealOnScroll delay={0.3}>
                    <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-2 mb-4 flex items-center gap-2">
                       <BookOpen size={20} className="text-blue-500"/> Education
                    </h3>
                    {STATIC_PROFILE.education.map((edu, idx) => (
                      <div key={idx} className="mb-4 last:mb-0 pl-4 border-l-2 border-slate-800 hover:border-blue-500 transition-colors">
                         <div className="flex justify-between items-baseline">
                            <h4 className="text-white font-medium">{edu.title}</h4>
                            <span className="text-slate-500 text-sm">{edu.year}</span>
                         </div>
                         <p className="text-slate-400 text-sm">{edu.place}</p>
                         {edu.grade && <p className="text-emerald-400 text-xs mt-1">{edu.grade}</p>}
                      </div>
                    ))}
                  </RevealOnScroll>

                  <RevealOnScroll delay={0.4}>
                    <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-2 mb-4 flex items-center gap-2">
                       <Award size={20} className="text-blue-500"/> Experience
                    </h3>
                    {STATIC_PROFILE.experience.map((exp, idx) => (
                      <div key={idx} className="mb-4 last:mb-0 pl-4 border-l-2 border-slate-800 hover:border-blue-500 transition-colors">
                         <div className="flex justify-between items-baseline">
                            <h4 className="text-white font-medium">{exp.role}</h4>
                            <span className="text-slate-500 text-sm">{exp.year}</span>
                         </div>
                         <p className="text-slate-400 text-sm">{exp.company}</p>
                      </div>
                    ))}
                  </RevealOnScroll>
               </div>
            </div>
         </div>
       </div>
    </section>
  );
};

const Projects = ({ dbProjects }) => {
  const displayProjects = dbProjects.length > 0 ? dbProjects : STATIC_PROJECTS;
  
  return (
    <section className="py-32 bg-slate-950 relative" id="projects">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Selected Works</h2>
              <p className="text-slate-500 max-w-md">A curated collection of projects pushing the boundaries of web and AI technology.</p>
            </div>
            <button onClick={() => window.open('https://github.com/tharukanandasiri', '_blank')} className="hidden md:flex items-center gap-2 text-white border-b border-white pb-1 hover:text-blue-400 hover:border-blue-400 transition-colors">
              View GitHub <ExternalLink size={16} />
            </button>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {displayProjects.map((project, idx) => (
            <RevealOnScroll key={project.id} delay={idx * 0.1}>
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                <div className="relative h-full bg-slate-900 rounded-2xl p-8 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="px-3 py-1 bg-slate-800 rounded-full text-xs font-mono text-blue-400 border border-slate-700">
                        {project.category || 'Development'}
                      </div>
                      <a href={project.link} className="text-slate-500 hover:text-white transition-colors">
                        <ExternalLink size={20} />
                      </a>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed mb-6">
                      {project.desc}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-800">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs font-medium text-slate-400">
                        {t} {i !== project.tech.length - 1 && "•"}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

const Volunteering = () => {
  return (
    <section id="volunteering" className="py-24 bg-black border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-12">
            <Heart className="text-red-500" size={32} />
            <h2 className="text-4xl font-bold text-white">Volunteering</h2>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-6">
          {STATIC_VOLUNTEERING.map((vol, idx) => (
            <RevealOnScroll key={idx} delay={idx * 0.1}>
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-red-500/50 transition-all hover:bg-slate-900 group">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="font-bold text-white group-hover:text-red-400 transition-colors">{vol.role}</h3>
                   <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded">{vol.org}</span>
                </div>
                <p className="text-slate-400 text-sm">{vol.event}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-12">
            <Award className="text-yellow-500" size={32} />
            <h2 className="text-4xl font-bold text-white">Certifications</h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STATIC_CERTIFICATIONS.map((cert, idx) => (
            <RevealOnScroll key={idx} delay={idx * 0.05}>
              <div className="h-full bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col justify-between hover:translate-y-[-5px] transition-transform duration-300 hover:shadow-xl hover:shadow-yellow-500/5">
                <div>
                   <Medal size={24} className="text-slate-600 mb-4" />
                   <h3 className="font-semibold text-slate-200 mb-2">{cert.title}</h3>
                </div>
                <p className="text-sm text-slate-500 mt-4 border-t border-slate-800 pt-4 flex justify-between items-center">
                  {cert.issuer}
                  <ExternalLink size={12} />
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

const Articles = ({ dbArticles }) => {
  const displayArticles = dbArticles.length > 0 ? dbArticles : STATIC_ARTICLES;

  return (
    <section className="py-24 bg-black relative border-t border-slate-900" id="articles">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <BookOpen className="text-blue-500" size={32} />
              <h2 className="text-4xl font-bold text-white">Latest Articles</h2>
            </div>
            <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
              View All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-8">
          {displayArticles.map((article, idx) => (
            <RevealOnScroll key={article.id} delay={idx * 0.1}>
              <a href={article.link} className="block group">
                <article className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all hover:bg-slate-900">
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
                    <Calendar size={14} />
                    <span>{article.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-slate-400 line-clamp-3">
                    {article.summary}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-blue-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    Read Article <ArrowRight size={14} />
                  </div>
                </article>
              </a>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="min-h-screen bg-slate-950 flex items-center relative overflow-hidden py-24">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left: Magnetic Interactions */}
          <div>
            <RevealOnScroll>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                 Let's Connect
              </div>
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
                Got a project? <br/>
                <span className="text-slate-500">Let's talk.</span>
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <div className="space-y-6">
                <MagneticButton className="w-full group">
                  <a href={`mailto:${STATIC_PROFILE.email}`} className="flex items-center justify-between p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:bg-slate-900 hover:border-blue-500/50 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Mail size={24} />
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-slate-400">Mail me at</p>
                        <p className="text-lg font-bold text-white">{STATIC_PROFILE.email}</p>
                      </div>
                    </div>
                    <ArrowRight className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </a>
                </MagneticButton>

                <div className="grid grid-cols-2 gap-4">
                  <MagneticButton className="w-full group">
                    <a href={STATIC_PROFILE.linkedin} target="_blank" className="flex items-center gap-4 p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:bg-[#0077b5]/10 hover:border-[#0077b5]/50 transition-all duration-300">
                       <Linkedin className="text-slate-400 group-hover:text-[#0077b5] transition-colors" size={24} />
                       <span className="text-white font-medium">LinkedIn</span>
                    </a>
                  </MagneticButton>
                  
                  <MagneticButton className="w-full group">
                    <a href={STATIC_PROFILE.github} target="_blank" className="flex items-center gap-4 p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:bg-white/5 hover:border-white/20 transition-all duration-300">
                       <Github className="text-slate-400 group-hover:text-white transition-colors" size={24} />
                       <span className="text-white font-medium">GitHub</span>
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right: Glassmorphic Form */}
          <RevealOnScroll delay={0.2}>
            <div className="relative">
              {/* Glow Effect behind form */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20"></div>
              
              <form action="https://formspree.io/f/mpwvbzoz" method="POST" className="relative bg-slate-900/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
                
                <div className="space-y-6">
                  <div className="group">
                    <label className="block text-sm text-slate-400 mb-2 group-focus-within:text-blue-400 transition-colors">Your Name</label>
                    <input 
                      type="text"
                      name="name" 
                      className="w-full bg-black/50 border border-slate-700 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="group">
                    <label className="block text-sm text-slate-400 mb-2 group-focus-within:text-blue-400 transition-colors">Email Address</label>
                    <input 
                      type="email" 
                      name="_replyto"
                      className="w-full bg-black/50 border border-slate-700 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div className="group">
                    <label className="block text-sm text-slate-400 mb-2 group-focus-within:text-blue-400 transition-colors">Message</label>
                    <textarea 
                      name="message"
                      className="w-full bg-black/50 border border-slate-700 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-all h-32 placeholder:text-slate-700 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transform transition-all active:scale-95 shadow-lg shadow-blue-500/20">
                    Send Message <Send size={18} />
                  </button>
                </div>
              </form>
            </div>
          </RevealOnScroll>
          
        </div>
      </div>
    </section>
  );
};

// --- ADMIN DASHBOARD ---

const AdminDashboard = ({ setView }) => {
  const [items, setItems] = useState([]);
  const [resourceType, setResourceType] = useState('projects');
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchItems();
  }, [resourceType]);

  const fetchItems = async () => {
    if (!db) return;
    const q = query(collection(db, resourceType), orderBy(resourceType === 'projects' ? 'createdAt' : 'date', 'desc'));
    const querySnapshot = await getDocs(q);
    setItems(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!db) return;
    
    const payload = resourceType === 'projects' 
      ? { ...formData, tech: formData.tech?.split(',') || [], createdAt: new Date().toISOString() }
      : { ...formData, date: new Date().toISOString().split('T')[0] };

    await addDoc(collection(db, resourceType), payload);
    setFormData({});
    setIsAdding(false);
    fetchItems();
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this item?")) {
      await deleteDoc(doc(db, resourceType, id));
      fetchItems();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-slate-800 p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-10 text-emerald-400 font-bold">
          <Command size={20} /> CMS PANEL
        </div>
        <div className="space-y-2">
          <button 
            onClick={() => { setResourceType('projects'); setIsAdding(false); }}
            className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${resourceType === 'projects' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-900'}`}
          >
            <Layers size={18} /> Projects
          </button>
          <button 
            onClick={() => { setResourceType('articles'); setIsAdding(false); }}
            className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${resourceType === 'articles' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-900'}`}
          >
            <FileText size={18} /> Articles
          </button>
        </div>
        <button onClick={() => { signOut(auth); setView('home'); }} className="mt-auto absolute bottom-6 flex items-center gap-2 text-red-400 hover:text-red-300">
          <LogOut size={16} /> Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold capitalize">{resourceType} Manager</h1>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg flex items-center gap-2 font-medium"
          >
            <Plus size={18} /> {isAdding ? 'Cancel' : 'Add New'}
          </button>
        </div>

        {isAdding ? (
          <div className="max-w-2xl bg-slate-900 p-6 rounded-xl border border-slate-800">
             <form onSubmit={handleAdd} className="space-y-6">
                <input 
                  placeholder="Title"
                  className="w-full bg-black border border-slate-700 rounded-lg p-3 text-white"
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  required
                />
                
                {resourceType === 'projects' ? (
                  <>
                    <input 
                      placeholder="Category (e.g. AI)"
                      className="w-full bg-black border border-slate-700 rounded-lg p-3 text-white"
                      onChange={e => setFormData({...formData, category: e.target.value})}
                    />
                    <input 
                      placeholder="Tech Stack (comma separated)"
                      className="w-full bg-black border border-slate-700 rounded-lg p-3 text-white"
                      onChange={e => setFormData({...formData, tech: e.target.value})}
                    />
                  </>
                ) : (
                  <input 
                    placeholder="Summary"
                    className="w-full bg-black border border-slate-700 rounded-lg p-3 text-white"
                    onChange={e => setFormData({...formData, summary: e.target.value})}
                    required
                  />
                )}

                <textarea 
                  placeholder={resourceType === 'projects' ? "Description" : "Content / Summary"}
                  className="w-full bg-black border border-slate-700 rounded-lg p-3 text-white h-32"
                  onChange={e => setFormData({...formData, [resourceType === 'projects' ? 'desc' : 'summary']: e.target.value})}
                  required
                />
                
                <input 
                  placeholder="Link URL"
                  className="w-full bg-black border border-slate-700 rounded-lg p-3 text-white"
                  onChange={e => setFormData({...formData, link: e.target.value})}
                />

                <button className="bg-blue-600 w-full py-3 rounded-lg font-bold">Publish</button>
             </form>
          </div>
        ) : (
          <div className="grid gap-4">
            {items.map(item => (
              <div key={item.id} className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 flex justify-between items-center group">
                <div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <div className="text-sm text-slate-400">
                    {/* Safe rendering to prevent Object error */}
                    {resourceType === 'projects' 
                      ? (typeof item.category === 'string' ? item.category : '') 
                      : (typeof item.date === 'string' ? item.date : '')}
                  </div>
                </div>
                <button onClick={() => handleDelete(item.id)} className="p-2 text-slate-500 hover:text-red-400 transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- LOGIN COMPONENT ---

const Login = ({ setView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if(!auth) throw new Error("Firebase not connected");
      await signInWithEmailAndPassword(auth, email, password);
      setView('admin');
    } catch (err) {
      setError("Access Denied.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Access</h2>
        {error && <div className="text-red-400 text-center mb-4">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-black/50 p-3 rounded-lg text-white border border-slate-700" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-black/50 p-3 rounded-lg text-white border border-slate-700" />
          <button className="w-full bg-blue-600 py-3 rounded-lg text-white font-bold">Login</button>
        </form>
        <button onClick={() => setView('home')} className="w-full mt-4 text-slate-500 text-sm">Back to Home</button>
      </div>
    </div>
  );
};

// --- APP ENTRY POINT ---

export default function App() {
  const [view, setView] = useState('home');
  const [user, setUser] = useState(null);
  const [dbProjects, setDbProjects] = useState([]);
  const [dbArticles, setDbArticles] = useState([]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ clientX, clientY, currentTarget }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!db) return;
      try {
        const pQ = query(collection(db, "projects"), orderBy("createdAt", "desc"));
        const pSnap = await getDocs(pQ);
        setDbProjects(pSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const aQ = query(collection(db, "articles"), orderBy("date", "desc"));
        const aSnap = await getDocs(aQ);
        setDbArticles(aSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (e) {}
    };
    fetchData();
  }, [view]);

  return (
    <div 
      className="bg-black min-h-screen font-sans text-slate-200 selection:bg-blue-500/30 overflow-x-hidden"
      onMouseMove={handleMouseMove}
    >
      <Spotlight mouseX={mouseX} mouseY={mouseY} />
      {view !== 'login' && view !== 'admin' && <FluidCursor />}
      {view !== 'login' && view !== 'admin' && <Navbar setView={setView} user={user} />}
      
      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div 
            key="home"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <Hero />
            <SkillsGrid />
            <About />
            <Projects dbProjects={dbProjects} />
            <Volunteering />
            <Certifications />
            <Articles dbArticles={dbArticles} />
            <Contact />

            <footer className="py-8 border-t border-slate-900 bg-slate-950 text-center text-slate-600 text-sm z-20 relative">
              <p>&copy; {new Date().getFullYear()} Tharuka Nandasiri. All rights reserved.</p>
            </footer>
          </motion.div>
        )}

        {view === 'login' && (
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Login setView={setView} />
          </motion.div>
        )}

        {view === 'admin' && user && (
          <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AdminDashboard setView={setView} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}