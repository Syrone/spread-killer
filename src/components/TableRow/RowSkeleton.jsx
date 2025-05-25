import React from "react"
import ContentLoader from "react-content-loader"

const RowSkeleton = (props) => (
  <ContentLoader 
    style={{ gridColumn: '-1 / 1' }}
    speed={2}
    viewBox="0 0 1200 72"
    backgroundColor="var(--theme-border-rgba-20)"
    foregroundColor="var(--theme-gray-rgba-70)"
    {...props}
  >
    <rect x="21" y="24" rx="4" ry="4" width="88" height="24" /> 
    <rect x="151" y="14" rx="4" ry="4" width="74" height="16" /> 
    <rect x="151" y="41" rx="4" ry="4" width="74" height="16" /> 
    <rect x="363" y="14" rx="4" ry="4" width="76" height="16" /> 
    <rect x="363" y="41" rx="4" ry="4" width="76" height="16" /> 
    <rect x="480" y="14" rx="4" ry="4" width="60" height="16" /> 
    <rect x="466" y="44" rx="0" ry="0" width="5" height="0" /> 
    <rect x="480" y="41" rx="4" ry="4" width="60" height="16" /> 
    <rect x="617" y="14" rx="4" ry="4" width="22" height="17" /> 
    <rect x="617" y="41" rx="4" ry="4" width="22" height="17" /> 
    <rect x="680" y="14" rx="4" ry="4" width="60" height="16" /> 
    <rect x="680" y="41" rx="4" ry="4" width="60" height="16" /> 
    <rect x="784" y="14" rx="4" ry="4" width="55" height="17" /> 
    <rect x="784" y="41" rx="4" ry="4" width="55" height="17" /> 
    <rect x="865" y="4" rx="4" ry="4" width="158" height="60" /> 
    <rect x="1035" y="4" rx="4" ry="4" width="158" height="60" />
  </ContentLoader>
)

export default RowSkeleton