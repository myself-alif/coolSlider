import {
	useBlockProps,
	MediaUploadCheck,
	MediaUpload,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import metadata from "./block.json";
import { useSelect } from "@wordpress/data";
import { Icon } from "@wordpress/components";

import "./editor.scss";

export default function Edit(props) {
	const image = useSelect(
		(select) => {
			const data = select("core").getEntityRecord(
				"postType",
				"attachment",
				props.attributes.imageId,
			);
			return data;
		},
		[props.attributes.imageId],
	);
	const imageSelected = props.attributes.imageId && image?.source_url;

	return (
		<div {...useBlockProps()}>
			{imageSelected && (
				<img
					style={{
						display: "block",
						height: 150,
						width: "100%",
						objectFit: "cover",
					}}
					src={image.source_url}
				/>
			)}
			{!imageSelected && (
				<div
					style={{
						display: "flex",
						height: 150,
						width: "100%",
						background: "white",
					}}
				>
					<Icon icon="format-image" style={{ margin: "auto" }} />
				</div>
			)}
			<MediaUploadCheck>
				<MediaUpload
					allowedTypes={["image"]}
					render={({ open }) => {
						return (
							<button className="media-select" onClick={open}>
								{imageSelected
									? __("Replace Image", metadata.textdomain)
									: __("Select Image", metadata.textdomain)}
							</button>
						);
					}}
					onSelect={(item) => {
						props.setAttributes({
							imageId: item.id,
						});
					}}
					value={props.attributes.imageId}
				/>
			</MediaUploadCheck>
		</div>
	);
}
