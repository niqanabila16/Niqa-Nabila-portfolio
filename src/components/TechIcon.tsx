import {
  siCodeigniter,
  siCucumber,
  siDocker,
  siDjango,
  siExpress,
  siFigma,
  siGit,
  siGithub,
  siGooglecolab,
  siGooglesheets,
  siHtml5,
  siJavascript,
  siJira,
  siKaggle,
  siMediapipe,
  siMermaid,
  siMongodb,
  siMysql,
  siNodedotjs,
  siNumpy,
  siOpencv,
  siPandas,
  siPostman,
  siPython,
  siPytorch,
  siReact,
  siRedis,
  siScikitlearn,
  siStreamlit,
  siTailwindcss,
  siTypescript,
  siVite,
  siXampp,
} from 'simple-icons'
import type { SimpleIcon } from 'simple-icons'

/**
 * Brand logos come from the `simple-icons` package (inline SVG paths, tree-shaken,
 * no network requests). Add a technology by importing its icon and listing it here;
 * then use its id in `stack` inside src/data/roles.ts.
 */
const ICONS: Record<string, SimpleIcon> = {
  python: siPython,
  django: siDjango,
  javascript: siJavascript,
  html5: siHtml5,
  git: siGit,
  github: siGithub,
  jira: siJira,
  mermaid: siMermaid,
  cucumber: siCucumber,
  pytorch: siPytorch,
  kaggle: siKaggle,
  streamlit: siStreamlit,
  mysql: siMysql,
  mongodb: siMongodb,
  redis: siRedis,
  docker: siDocker,
  node: siNodedotjs,
  express: siExpress,
  react: siReact,
  typescript: siTypescript,
  vite: siVite,
  tailwind: siTailwindcss,
  postman: siPostman,
  figma: siFigma,
  opencv: siOpencv,
  mediapipe: siMediapipe,
  scikitlearn: siScikitlearn,
  numpy: siNumpy,
  pandas: siPandas,
  colab: siGooglecolab,
  googlesheets: siGooglesheets,
  codeigniter: siCodeigniter,
  xampp: siXampp,
}

/** Brands that simple-icons does not ship are drawn by hand. */
const EXCEL_PATH = 'M3 3h18v18H3z M7.5 8l3 4-3 4h2.2l1.9-2.6 1.9 2.6h2.2l-3-4 3-4h-2.2l-1.9 2.6L9.7 8z'

export default function TechIcon({ id }: { id: string }) {
  const icon = ICONS[id]
  if (icon) {
    return (
      <span className="tech">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d={icon.path} fill={`#${icon.hex}`} />
        </svg>
        <span className="tech__name">{icon.title}</span>
      </span>
    )
  }
  if (id === 'excel') {
    return (
      <span className="tech">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d={EXCEL_PATH} fill="#1d6f42" fillRule="evenodd" />
        </svg>
        <span className="tech__name">Excel</span>
      </span>
    )
  }
  return (
    <span className="tech">
      <span className="tech__name">{id}</span>
    </span>
  )
}
