'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Breadcrumbs() {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(seg => seg)

  return (
    <nav className="text-sm ms-10 fjalla-one text-gray-600 my-4">
      <ol className="flex space-x-2">
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </li>
        {pathSegments.map((seg, idx) => {
          const href = '/' + pathSegments.slice(0, idx + 1).join('/')
          const isLast = idx === pathSegments.length - 1
          return (
            <li key={href} className="flex items-center space-x-2">
              <span>/</span>
              {isLast ? (
                <span className="text-gray-500 capitalize">{decodeURIComponent(seg)}</span>
              ) : (
                <Link href={href} className="hover:underline capitalize">
                  {decodeURIComponent(seg)}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
