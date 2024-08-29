import {
	useBlockProps,
	MediaUploadCheck,
	MediaUpload,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import metadata from "./block.json";
import { useSelect } from "@wordpress/data";

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

	return (
		<div {...useBlockProps()}>
			{!!props.attributes.imageId && image?.source_url && (
				<img
					style={{ height: 150, widows: "100%", objectFit: "cover" }}
					src={image.source_url}
				/>
			)}
			<MediaUploadCheck>
				<MediaUpload
					allowedTypes={["image"]}
					render={({ open }) => {
						return (
							<button onClick={open}>
								{__("Select Image", metadata.textdomain)}
							</button>
						);
					}}
					onSelect={(item) => {
						props.setAttributes({
							imageId: item.id,
						});
					}}
					// value={props.attributes.imageId}
				/>
			</MediaUploadCheck>
		</div>
	);
}
