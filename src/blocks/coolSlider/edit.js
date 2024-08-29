import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	BlockControls,
	InnerBlocks,
} from "@wordpress/block-editor";
import { ToolbarGroup, ToolbarButton, Icon } from "@wordpress/components";
import { useState } from "@wordpress/element";
import metadata from "./block.json";
import "./editor.scss";

export default function Edit(props) {
	const [editMode, setEditMode] = useState(true);
	return (
		<>
			<div {...useBlockProps()}>
				{editMode ? (
					<div className="edit-mode">
						<span className="gallery-label">
							{__("Image Gallery", metadata.textdomain)}
						</span>
						<InnerBlocks allowedBlocks={["blocks/imageblock"]} />
					</div>
				) : (
					<div className="preview-mode">preview</div>
				)}
			</div>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={
							editMode ? (
								<Icon icon="welcome-view-site" />
							) : (
								<Icon icon="edit" />
							)
						}
						label={
							editMode
								? __("Preview gallery", metadata.textdomain)
								: __("Edit gallery", metadata.textdomain)
						}
						onClick={() => {
							setEditMode((prevState) => {
								return (prevState = !prevState);
							});
						}}
					/>
				</ToolbarGroup>
			</BlockControls>
		</>
	);
}
