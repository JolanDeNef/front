// Source: https://github.com/sroucheray/contain-cover/blob/master/contain-cover.js

function fit(contains: boolean) {
	return function(
		containerWidth: number,
		containerHeight: number,
		width: number,
		height: number
	) {
		let doRatio = width / height
		let cRatio = containerWidth / containerHeight
		let targetWidth = 0
		let targetHeight = 0
		let test = contains ? doRatio > cRatio : doRatio < cRatio

		if (test) {
			targetWidth = containerWidth
			targetHeight = targetWidth / doRatio
		} else {
			targetHeight = containerHeight
			targetWidth = targetHeight * doRatio
		}

		return {
			width: targetWidth,
			height: targetHeight,
			x: (containerWidth - targetWidth) / 2,
			y: (containerHeight - targetHeight) / 2
		}
	}
}

export const contain = fit(true)
export const cover = fit(false)
