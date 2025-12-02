import SecondaryButton, {
  SecondaryButtonProps,
} from '@components/SecondaryButton/SecondaryButton';

export interface StartMenuCategoryProps {
  title: string;
  buttonProps?: SecondaryButtonProps;
}

function StartMenuCategory({ title, buttonProps }: StartMenuCategoryProps) {
  return (
    <div className="start-menu__category">
      <h4 className="start-menu__category-title">{title}</h4>
      {buttonProps && (
        <SecondaryButton
          icon={buttonProps?.icon}
          name={buttonProps.name}
          iconPosition={buttonProps.iconPosition}
          onButtonClick={buttonProps.onButtonClick}
        />
      )}
    </div>
  );
}

export default StartMenuCategory;
