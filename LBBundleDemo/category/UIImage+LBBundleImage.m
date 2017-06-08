//
//  UIImage+LBBundleImage.m
//  LBBundleDemo
//
//  Created by JiBaoBao on 17/2/17.
//  Copyright © 2017年 JiBaoBao. All rights reserved.
//

#import "UIImage+LBBundleImage.h"

@implementation UIImage (LBBundleImage)

+ (UIImage *)lb_bundleImage1FromBundleNamed:(NSString *)bundleName imageName:(NSString *)imageName{
    NSString *mainBundlePath=[[NSBundle mainBundle] resourcePath];
    NSString *imageFilePath=[[mainBundlePath stringByAppendingPathComponent: bundleName] stringByAppendingPathComponent:imageName];
    return [UIImage imageWithContentsOfFile:imageFilePath];
}

+ (UIImage *)lb_bundleImage2FromBundleNamed:(NSString *)bundleName imageName:(NSString *)imageName{
    NSString *mainBundlePath=[[NSBundle mainBundle] resourcePath];
    //下面两行代码，完成的功能是一样的
//    NSString *basePath = [mainBundlePath stringByAppendingPathComponent: bundleName];
    NSString *basePath = [mainBundlePath stringByAppendingString:[NSString stringWithFormat:@"/%@",bundleName]];
    NSBundle *bundle = [NSBundle bundleWithPath:basePath];
    return [UIImage imageNamed:imageName inBundle:bundle compatibleWithTraitCollection:nil];
}

+ (UIImage *)lb_BundleAssetsImageFromeBundleName:(NSString *)bundleName imageName:(NSString *)imageName{
    NSString * mainBundlePath = [[NSBundle mainBundle] resourcePath];
    NSString *basePath = [mainBundlePath stringByAppendingPathComponent:bundleName];
    
    NSString *imageTmpStr = [imageName stringByReplacingOccurrencesOfString:@".png" withString:@""];
    imageTmpStr = [imageTmpStr stringByReplacingOccurrencesOfString:@".jpg" withString:@""];
    NSString *fileName = [NSString stringWithFormat:@"%@.imageset",imageTmpStr];
    
    NSString *imageFilePath = [[[basePath stringByAppendingPathComponent:@"testAssets.xcassets"]stringByAppendingPathComponent:fileName] stringByAppendingPathComponent:imageName];
    return [UIImage imageWithContentsOfFile:imageFilePath];
}

@end
