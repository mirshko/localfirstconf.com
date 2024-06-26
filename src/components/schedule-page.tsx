import {FC, ReactNode} from 'react'
import {Schedule} from './schedule'
import {allSessions, allProfiles} from 'contentlayer/generated'

export const SchedulePage: FC<{type: 'conference' | 'expo'; children?: ReactNode}> = ({type, children}) => {
  const sessions = allSessions
    .filter((session) => session.category === type)
    .map((session) => {
      const speaker = allProfiles.find((profile) => profile.slug === session.speaker)!
      return {...session, speaker}
    })
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())

  return (
    <div className="width-schedule px-4 pt-24 md:pl-16 md:pr-0">
      {children}
      <Schedule sessions={sessions} />
    </div>
  )
}
