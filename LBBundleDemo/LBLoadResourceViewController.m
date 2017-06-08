//
//  LBLoadResourceViewController.m
//  LBBundleDemo
//
//  Created by JiBaoBao on 17/3/1.
//  Copyright © 2017年 JiBaoBao. All rights reserved.
//

#import "LBLoadResourceViewController.h"
#import "UIImage+LBBundleImage.h"

#define MYBUNDLE_NAME   @"bundle4.bundle"
#define MYBUNDLE_PATH   [[[NSBundle mainBundle] resourcePath] stringByAppendingPathComponent: MYBUNDLE_NAME]
#define MYBUNDLE        [NSBundle bundleWithPath: MYBUNDLE_PATH]

@interface LBLoadResourceViewController ()
@property (weak, nonatomic) IBOutlet UIImageView *bundleImgView1;
@property (weak, nonatomic) IBOutlet UIImageView *bundleImgView2;
@property (weak, nonatomic) IBOutlet UIImageView *bundleImgView3;
@property (weak, nonatomic) IBOutlet UIImageView *bundleImgView4;
@end

@implementation LBLoadResourceViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    /** bundle加载图片 */
    //方法1 - imageWithContentsOfFile
    self.bundleImgView1.image = [UIImage lb_bundleImage1FromBundleNamed:@"bundle1.bundle" imageName:@"cyh.jpg"];
    //方法1 - imagename inBundle
    self.bundleImgView2.image = [UIImage lb_bundleImage2FromBundleNamed:@"bundle1.bundle" imageName:@"cyh.jpg"];

    
    
    /** 从bundle 中.xcassets中加载image */
    //方法1 - 未配置的Bundle -> 强制转换读取
    self.bundleImgView3.image = [UIImage lb_BundleAssetsImageFromeBundleName:@"bundle1.bundle" imageName:@"pyy.png"];
    //方法2 - new project配置的bundle -> 直接读取
    self.bundleImgView4.image = [UIImage imageNamed:@"pyy" inBundle:MYBUNDLE compatibleWithTraitCollection:nil];
    
}


@end
