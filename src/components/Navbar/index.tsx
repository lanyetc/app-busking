"use client"

import { FC, useState } from "react"
import Image from 'next/image'
import style from './index.module.css'
import { usePathname } from "next/navigation";
import classnames from "classnames";
import Link from "next/link";
import { Button, Input, Modal } from "antd";

const Transparent_BG_Pages = [
	'/music-festival',
	'/resources',
]

const LinkItem = (props: any) => {
	const { label, href } = props;
	return (
		<Link className={style.link} href={href}>
			<span className={style.label}>{label}</span>
			<div className={style.underline} />
		</Link>
	)
}

const Menu = (props: any) => {
	const { menus } = props;
	const pathname = usePathname();
	// const activeItem = menus.find((item:any) => item.href === pathname) || menus?.[0];
	return (
		<div className={style.menu}>
			<LinkItem label={menus[0].label} href={menus[0].href} />
			<div className={style.dropdown}>
				{menus?.map((item: any, index: number) => <LinkItem key={index} label={item.label} href={item.href} />)}
			</div>
		</div>
	)
}

const Navbar: FC = () => {
	const [loginStatus, setLoginStatus] = useState('login')
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
	const pathname = usePathname();
	const userInfo = window ? localStorage.getItem('userInfo') : false;
	const transparentBG = Transparent_BG_Pages.includes(pathname);
	const navs = [
		{
			children: [
				{ label: 'About', href: '/' },
				{ label: 'History', href: '/history' },
				{ label: 'Story', href: '/story' },
				// {label: 'Goal', href: '/goal'},
			]
		},
		{ label: 'Map', href: '/map' },
		{
			children: [
				{ label: 'News', href: '/news' },
				{ label: 'Application', href: '/application' },
				{ label: 'Music Festival', href: '/music-festival' },
				{ label: 'Regulations', href: '/regulations' },
			]
		},
		{
			children: [
				{ label: 'Support', href: '/FAQ' },
				{ label: 'FAQ', href: '/FAQ' },
				{ label: 'Resources', href: '/resources' },
			]
		},
	]
	const onLogin = () => {
		setIsLoginModalOpen(false);
		window && localStorage.setItem('userInfo', loginStatus);
	}
	return (
		<div className={classnames(style.navbar, { [style.transparent]: transparentBG })}>
			<span className="icon">
				<Image src="/blusking-logo.png"
					alt="Blusking Logo"
					width={100}
					height={24}
					priority />
			</span>
			<span style={{ flex: 1 }} />
			<div className={style.navs}>
				{navs.map((nav: any, index: number) => (
					nav.children ?
						<Menu key={index} menus={nav.children} />
						: <LinkItem key={index} label={nav.label} href={nav.href} />
				))}
			</div>
			<div className={style.userLoginItem}>
				{userInfo ? (
					<div className={style.avator}>
						<Image src={'/user-avator.svg'} alt={'/user-avator.svg'} width={32} height={32} />
					</div>
				) : (
					<Button onClick={() => setIsLoginModalOpen(true)}>Log In</Button>
				)}
			</div>
			<Modal
				open={isLoginModalOpen}
				onCancel={() => setIsLoginModalOpen(false)}
				footer={null}
				className={classnames('comment-modal', style.loginModal)}
				centered={true}
			>
				<div className={style.modalBody}>
					<div style={{ position: 'relative', zIndex: 10 }}>
						<div className={classnames("text-with-underline", style.modalTitle)}>
							{loginStatus === 'login' ? 'Log In' : loginStatus === 'audience' ? 'Audience' : 'busker'}
						</div>
						{loginStatus === 'login' ? <div className={style.selectContainer}>
							<Button
								style={{ width: 248, height: 50, borderRadius: 20, marginBottom: 24, fontSize: 26 }}
								ghost
								onClick={() => setLoginStatus('busker')}
							>
								as busker
							</Button>
							<Button
								style={{ width: 248, height: 50, borderRadius: 20, fontSize: 26 }}
								ghost
								onClick={() => setLoginStatus('audience')}
							>
								as audience
							</Button>
						</div> : <div className={style.loginContainer}>
							<Input className={style.input} placeholder={loginStatus === 'busker' ? "ID No." : "Email"} />
							<Input className={style.input} placeholder="Password" />
							<Button className={style.loginBtn} onClick={onLogin}>Log in</Button>
							{loginStatus === 'busker' ?
								<span className={style.signUp}>
									want to join us? 
									<Link
										href={'/sign-in'}
										className={classnames(style.signUp, 'text-with-underline')}
										onClick={() => setIsLoginModalOpen(false)}
									>
										Become busker
									</Link>
								</span>
								: <Link
									href={'/sign-in'}
									className={style.signUp}
									onClick={() => setIsLoginModalOpen(false)}
								>
									Sign up
								</Link>}

						</div>}
					</div>
					<Image
						className={style.modalBGImg}
						src={
							loginStatus === 'login' ? '/login-bg-1.png'
								: loginStatus === 'audience'
									? '/login-bg-2.png'
									: '/login-bg-3.png'
						}
						alt="login-bg.png"
						width={400}
						height={340}
					/>
				</div>
			</Modal>
		</div>
	)
}

export default Navbar;