'use client'
import { siteConfig } from '@/app/siteConfig'
import { cx, focusRing } from '@/lib/utils'
import {
  RiHome2Line,
  RiLinkM,
  RiListCheck,
  RiSettings5Line,
} from "@remixicon/react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'


const TabNavigation = () => {
  const tabs = [
    { name: "Overview", href: siteConfig.baseLinks.overview,icon: RiHome2Line },
    { name: "Details", href: siteConfig.baseLinks.details, icon: RiListCheck},
    {
      name: "Settings",
      href: siteConfig.baseLinks.settings,
      icon: RiSettings5Line,
    },
  ] as const
  const pathname = usePathname()
  const isActive = (itemHref: string) => {
    if (itemHref === siteConfig.baseLinks.settings) {
      return pathname.startsWith("/settings")
    }
    return pathname === itemHref || pathname.startsWith(itemHref)
  }

  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className="px-8">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          // defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={cx(
                  isActive(tab.href)
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                  "flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                  focusRing,
                )}
              >
                <tab.icon
                        className="size-4 shrink-0"
                        aria-hidden="true"
                      />
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default TabNavigation
