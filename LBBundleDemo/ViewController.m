//
//  ViewController.m
//  LBBundleDemo
//
//  Created by JiBaoBao on 17/2/17.
//  Copyright © 2017年 JiBaoBao. All rights reserved.
//

#import "ViewController.h"
#import "LBLoadResourceViewController.h"
#import "LBInternationalViewController.h"
#import "LBWebViewController.h"

#define MYBUNDLE_NAME   @"bundle4.bundle"
#define MYBUNDLE_PATH   [[[NSBundle mainBundle] resourcePath] stringByAppendingPathComponent: MYBUNDLE_NAME]
#define MYBUNDLE        [NSBundle bundleWithPath: MYBUNDLE_PATH]

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];

}

- (IBAction)btnClick:(UIButton *)sender {
    // bundle的作用:放资源：图片、国际化、h5、.storyboard、 .xib
    switch (sender.tag) {
        case 10:{//读取image等资源
            LBLoadResourceViewController *loadResourceVC = [[LBLoadResourceViewController alloc]init];
            [self.navigationController pushViewController:loadResourceVC animated:YES];
        }
            break;
        case 11:{//读取h5资源
            LBWebViewController *webVC = [[LBWebViewController alloc]init];
            [self.navigationController pushViewController:webVC animated:YES];
        }
            break;
        case 12:{//读取国际化资源
            LBInternationalViewController *internationalVC = [[LBInternationalViewController alloc]init];
            [self.navigationController pushViewController:internationalVC animated:YES];
        }
            break;
        case 14:{//读取 .storyboard 资源
            UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"testSB" bundle:MYBUNDLE];
            UIViewController *test = [storyboard instantiateViewControllerWithIdentifier:@"testvc"];
            [self.navigationController pushViewController:test animated:YES];
        }
            break;
        default:
            break;
    }
}


@end
