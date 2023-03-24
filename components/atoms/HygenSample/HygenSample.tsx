/**
 *
 */
export type Props = {
  title: string
}
/**
 *
 */
export const HygenSample: React.FC<Props> = (props) => {
  return <div className="bg-red-400 dark:bg-green-300">{props.title}</div>
}
