import { BackgroundImageMap } from '@definitions/settingsTypes';
import './ImagePicker.scss';
import { BACKGROUND_IMAGE_MAP } from '@constants/settingsConstants';

export interface ImagePickerProps {
  selectedImage: BackgroundImageMap;
  onImageClick: (name: BackgroundImageMap) => void;
  title: string;
}

function ImagePicker({ selectedImage, title, onImageClick }: ImagePickerProps) {
  const titleId = `image-picker-title-${title.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="image-picker" role="group" aria-labelledby={titleId}>
      <img
        className="image-picker__preview"
        src={selectedImage.image}
        alt={`Selected background: ${selectedImage.name}`}
        title={selectedImage.name}
      />

      <h6 id={titleId} className="image-picker__title">
        {title}
      </h6>

      <div
        className="image-picker__tile-container"
        role="listbox"
        aria-label={`${title} options`}
      >
        {Object.entries(BACKGROUND_IMAGE_MAP).map(([itemName, item]) => {
          const isSelected = selectedImage.name === item.name;

          return (
            <button
              key={itemName}
              className={`image-picker__tile${isSelected ? ' image-picker__tile--selected' : ''}`}
              type="button"
              role="option"
              aria-selected={isSelected}
              aria-label={`${item.name}${isSelected ? ' (selected)' : ''}`}
              onClick={() => onImageClick(item)}
              title={item.name}
            >
              <img src={item.image} alt="" aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ImagePicker;
