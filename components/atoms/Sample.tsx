type SampleProps = {
  title: string
}

export const Sample = ({ title }: SampleProps) => {
  return <div className="h-10 w-10 bg-red-700">{title}</div>
}
