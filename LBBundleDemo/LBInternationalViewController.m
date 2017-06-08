//
//  LBInternationalViewController.m
//  LBBundleDemo
//
//  Created by JiBaoBao on 17/3/1.
//  Copyright © 2017年 JiBaoBao. All rights reserved.
//

#import "LBInternationalViewController.h"
#import "NSBundle+LBInternational.h"

NSString *const LBInternationalText = @"LBInternationalText";

@interface LBInternationalViewController ()
@property (weak, nonatomic) IBOutlet UILabel *label;
@end

@implementation LBInternationalViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    NSString *string = [NSBundle lb_localizedStringForKey:LBInternationalText];
    self.label.text = string;
}

@end
