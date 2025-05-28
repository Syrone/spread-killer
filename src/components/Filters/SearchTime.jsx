import Input from '../Input/Input'
import Button from '../Buttons/Button'
import styles from './Filters.module.scss'

const SearchTime = ({ value, onValueChange, label }) => {
	return (
		<div className={styles['input-number']}>
      <Input
        className={styles['input-number-input']}
        placeholder='0'
        hasReset={false}
        value={value}
        maxLength={2}
        onChange={e => {
          const v = e.target.value.replace(/\D/g, '')
          onValueChange(v)
        }}
      />
      <Button size='base' typestyle='secondary' className={styles['input-number-button']}>
        {label}
      </Button>
    </div>
	)
}

export default SearchTime
