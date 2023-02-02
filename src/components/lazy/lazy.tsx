import React from 'react'

const lazy = (factory: () => Promise<{ default: React.FC }>): React.ReactElement => {
  const Component = React.lazy(factory)
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component></Component>
    </React.Suspense>
  )
}

export default lazy
