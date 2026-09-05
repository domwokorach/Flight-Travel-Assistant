'use client'

export function ThemeScript() {
  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `(function(){try{if(localStorage.getItem("theme")==="light")document.documentElement.classList.remove("dark")}catch(e){}})()`,
      }}
    />
  )
}
