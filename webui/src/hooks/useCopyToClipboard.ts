function useCopyToClipboard() {
  const copyToClipboard = async (text:string) => {
    try {
      const res = await navigator.clipboard.writeText(text)
      console.log('res', res)
      return {status: 'success'}
    } catch (e) {
      throw e
    }
  }
  return {copyToClipboard}
}

export default useCopyToClipboard