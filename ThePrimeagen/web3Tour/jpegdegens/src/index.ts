import { ethers } from "ethers";
// deployed by hand to begin

function getEth() {
	// @ts-ignore
	const eth = window.ethereum;
	if (!eth) {
		throw new Error("get metamask and a positive attitude")
	}
	return eth;
}

async function hasAccounts() {
	const eth = getEth();
	const accounts = await eth.request({ method: "eth_accounts"}) as string[];

	return accounts && accounts.length;
}

async function requestAccounts() {
	const eth = getEth();
	const accounts = await eth.request({ method: "eth_requestAccounts"}) as string[];

	return accounts && accounts.length;
}

async function run() {
	if (!await hasAccounts() && !await requestAccounts()) {
		throw new Error("please let me take your money");
	}
	// addressOrName: string, contractInterface: Contract
	const hello = new ethers.Contract(
		// where is contract on network
		"0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
		[
			// what is on contract
			"function hello() public pure returns (string memory)",
		],
		// how to communicate with the contract
		new ethers.providers.Web3Provider(getEth()),
	)

	document.body.innerHTML = await hello.hello();
}

run();
``
