type Props = {
  children: React.ReactNode
  errorMessage?: string
}

export function FormGroup({ children, errorMessage }: Props) {
  return (
    <div className={`form-group ${errorMessage != null ? "error" : ""}`}>
      {children}
      {errorMessage != null && (
        <div className="error-message">{errorMessage}</div>
      )}
    </div>
  )
}
