import { useEffect, FunctionComponent } from 'react'
import Prism from 'prismjs'

import { getExtension } from '../../utils/getFileIcon'
import { useStaleSWR } from '../../utils/tools'
import FourOhFour from '../FourOhFour'
import Loading from '../Loading'
import DownloadBtn from '../DownloadBtn'

const CodePreview: FunctionComponent<{ file: any }> = ({ file }) => {
  const { data, error } = useStaleSWR(file['url'])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll()
    }
  }, [data])

  if (error) {
    return (
      <div className="dark:bg-gray-900 p-3 bg-white rounded shadow">
        <FourOhFour errorMsg={error.message} />
      </div>
    )
  }
  if (!data) {
    return (
      <div className="dark:bg-gray-900 p-3 bg-white rounded shadow">
        <Loading loadingText="Loading file content..." />
      </div>
    )
  }

  return (
    <>
      <div className="markdown-body p-3 bg-gray-900 rounded shadow">
        <pre className={`language-${getExtension(file.name)}`}>
          <code>{data}</code>
        </pre>
      </div>
      <div className="mt-4">
        <DownloadBtn downloadUrl={file['download_url']} />
      </div>
    </>
  )
}

export default CodePreview
