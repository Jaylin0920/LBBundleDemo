//
//  UIImage+LBBundleImage.h
//  LBBundleDemo
//
//  Created by JiBaoBao on 17/2/17.
//  Copyright © 2017年 JiBaoBao. All rights reserved.
//

/*
 * 类注释：UIImage_category 从bundle中获取image
 */
#import <UIKit/UIKit.h>

@interface UIImage (LBBundleImage)

/**
 * 从bundle中获取image
 * （方法1 - 找到 imagePath，imageWithContentsOfFile 读取）
 
 * @param bundleName <#bundleName description#>
 * @param imageName <#imageName description#>
 * @return <#return value description#>
 */
+ (UIImage *)lb_bundleImage1FromBundleNamed:(NSString *)bundleName imageName:(NSString *)imageName;

/**
 * 从bundle中获取image
 * （方法1 - 找到 bundle 地址，image in bundle 读取）
 
 * @param bundleName <#bundleName description#>
 * @param imageName <#imageName description#>
 * @return <#return value description#>
 */
+ (UIImage *)lb_bundleImage2FromBundleNamed:(NSString *)bundleName imageName:(NSString *)imageName;

/**
 * 强制从 bundle 中的 .xcassets 文件中读取图片
 * (传入的imageName 需加尾缀 .jpg .png)
 *
 * @param bundleName <#bundleName description#>
 * @param imageName <#imageName description#>
 * @return <#return value description#>
 */
+ (UIImage *)lb_BundleAssetsImageFromeBundleName:(NSString *)bundleName imageName:(NSString *)imageName;


@end
